const createTokenUtil = require("../../../utils/createToken.util");
const { UserOtp, User, UserSocial } = require("../../../models/index");
const { Op } = require("sequelize");
const createOtpService = require("../../services/createOtp.service");
const forgetPwUtil = require("../../../utils/forgetPw.until");
const hashUtil = require("../../../utils/hash.util");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (req, res) => {
    // console.log(`login hihihih`);
    // console.log(req.isAuthenticated());
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("msgSuccess");
    return res.render("auth/login", {
      layout: "layouts/auth.layout.ejs",
      msgErr,
      msgSuccess,
    });
  },
  handleLogin: async (req, res) => {
    const id = req.user.user.id;
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
    console.log(`handle TwoFA`);
    console.log(req.user);
    const id = req.user.user.id;
    const { otp } = req.body;
    const userOtp = await UserOtp.findOne({
      where: {
        userId: id,
      },
    });
    const currentTime = new Date();
    if (userOtp.expires > currentTime) {
      if (otp === userOtp.otp) {
        console.log(`đúng otp`);
        // set cookie
        const token = await createTokenUtil(id);
        res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });
        if (req.user.user.typeId === 1) {
          return res.redirect("/student");
        } else if (req.user.user.typeId === 2) {
          return res.redirect("/teacher");
        } else if (req.user.user.typeId === 3) {
          return res.redirect("/admin");
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
  forgetFw: (req, res) => {
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("msgSuccess");
    return res.render("auth/forgetPw", {
      layout: "layouts/auth.layout.ejs",
      msgErr,
      msgSuccess,
    });
  },
  handleForgetPw: async (req, res) => {
    const { email } = req.body;
    console.log(464048068);
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (!user) {
      req.flash("msgErr", "Không tồn tại email!");
      return res.redirect("/auth/forgetPw");
    }
    forgetPwUtil(email);

    req.flash("msgSuccess", "Gửi email thành công! Vui lòng kiểm tra email");
    res.redirect("/auth/forgetPw");
  },
  resetPw: async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
      if (err) {
        if (err.expiredAt < new Date()) {
          return res.send("Liên kết hết hạn!");
        } else {
          return res.send("Liên kết không hợp lệ!");
        }
      } else {
        const msgErr = req.flash("msgErr");
        return res.render("auth/resetPw", {
          layout: "layouts/auth.layout.ejs",
          msgErr,
        });
      }
    });
  },
  handleResetPw: async (req, res) => {
    const token = req.params.token;
    const { password, rePassword } = req.body;

    if (password !== rePassword) {
      console.log(60464);
      req.flash("msgErr", "Vui lòng nhập mật khẩu giống nhau!");
      res.redirect(`/auth/resetPw/${token}`);
    } else {
      jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
        if (err) {
          return res.send("Liên kết hết hạn!");
        }
        await User.update(
          { password: hashUtil.make(rePassword) },
          { where: { email: decoded.email } }
        );
      });
      req.flash("msgSuccess", "Đổi mật khẩu thành công vui lòng đăng nhập!");
      res.redirect("/auth/login");
    }
  },
  googleCb: async (req, res) => {
    console.log(`google CB`);
    console.log(req.user.userSocial);
    console.log(req.user.user);
    const token = await createTokenUtil(req.user.user.id);
    res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });

    console.log(`google CB end`);
    if (req.user.user.typeId === 1) {
      return res.redirect("/student");
    } else if (req.user.user.typeId === 2) {
      return res.redirect("/teacher");
    } else if (req.user.user.typeId === 3) {
      console.log(`google CB end`);
      return res.redirect("/admin");
    }
  },
  disableGoogle: async (req, res) => {
    const id = req.user.user.id;
    await UserSocial.destroy({
      where: {
        [Op.and]: [{ userId: id }, { provider: "google" }],
      },
    });
    req.flash("success", "Xóa liên kết thành công");
    res.redirect("/admin");
  },
  githubCb: async (req, res) => {
    console.log(`passport CB`);
    console.log(req.user);
    const token = await createTokenUtil(req.user.user.id);
    res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });

    console.log(`passport CB end`);
    if (req.user.user.typeId === 1) {
      return res.redirect("/student");
    } else if (req.user.user.typeId === 2) {
      return res.redirect("/teacher");
    } else if (req.user.user.typeId === 3) {
      console.log(`passport CB end`);
      return res.redirect("/admin");
    }
  },
  disableGithub: async (req, res) => {
    const id = req.user.user.id;
    await UserSocial.destroy({
      where: {
        [Op.and]: [{ userId: id }, { provider: "google" }],
      },
    });
    req.flash("success", "Xóa liên kết thành công");
    res.redirect("/admin");
  },
  facebookCb: async (req, res) => {
    console.log(`passport CB`);
    console.log(req.user);
    const token = await createTokenUtil(req.user.user.id);
    res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });

    if (req.user.user.typeId === 1) {
      return res.redirect("/student");
    } else if (req.user.user.typeId === 2) {
      return res.redirect("/teacher");
    } else if (req.user.user.typeId === 3) {
      return res.redirect("/admin");
    }
  },
};
