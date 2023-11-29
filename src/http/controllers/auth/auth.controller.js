const createTokenUtil = require("../../../utils/createToken.util");
const twoFAutil = require("../../../utils/twoFA.util");
const { UserOtp, User } = require("../../../models/index");
const createOtpService = require("../../services/createOtp.service");
module.exports = {
  login: async (req, res) => {
    // const date = new Date(Date.now() + 5 * 60 * 1000);
    // console.log(date);
    // const current = new Date();
    // console.log(current);
    // if (date > current) {
    //   console.log(`con han`);
    // }
    const msgErr = req.flash("error");

    return res.render("auth/login", {
      layout: "layouts/auth.layout.ejs",
      msgErr,
    });
  },
  handleLogin: async (req, res) => {
    const id = req.user.id;
    const { email } = req.body;
    createOtpService(id, email);
    return res.redirect("/auth/twoFA");
  },
  logout: (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }

      res.clearCookie("loginToken");
      // res.end();
      return res.redirect("/auth/login");
    });
  },
  twoFA: (req, res) => {
    const msgErr = req.flash("msgErr");
    return res.render("auth/twoFA", {
      layout: "layouts/auth.layout.ejs",
      msgErr,
    });
  },
  handleTwoFA: async (req, res) => {
    const id = req.user.id;
    const { otp } = req.body;
    const userOtp = await UserOtp.findOne({
      where: {
        userId: id,
      },
    });
    const currentTime = new Date();
    if (userOtp.expires > currentTime) {
      if (otp === userOtp.otp) {
        // set cookie
        const token = await createTokenUtil(+id);
        res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });
        if (req.user.typeId === 1) {
          return res.redirect("/student");
        } else if (req.user.typeId === 2) {
          return res.redirect("/teacher");
        }
      }

      req.flash("msgErr", "Mã xác minh không đúng! Vui lòng nhập lại");
      res.redirect("/auth/twoFA");
    } else {
      req.flash("msgErr", "Mã xác minh đã hết hạn");
      res.redirect("/auth/twoFA");
    }
  },
  resendOtp: async (req, res) => {
    const id = req.user.id;

    const userOtp = await UserOtp.findOne({
      where: {
        userId: id,
      },
    });
    const user = await User.findByPk(id);

    // nếu mới gửi email đc 1 phút thì ko cho gửi tiếp
    if (userOtp.expires > new Date(Date.now() + 4 * 60 * 1000)) {
      req.flash("msgErr", "Vui lòng chờ trong giây lát");
      res.redirect("/auth/twoFA");
    } else {
      createOtpService(id, user.email);
      req.flash("msgErr", "Vui lòng kiểm tra email");
      res.redirect("/auth/twoFA");
    }
  },
};
