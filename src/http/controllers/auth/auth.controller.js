const createTokenUtil = require("../../../utils/createToken.util");
const twoFAutil = require("../../../utils/twoFA.util");
const { UserOtp } = require("../../../models/index");
module.exports = {
  login: (req, res) => {
    // const date = new Date(Date.now() + 5 * 60 * 1000);
    // console.log(date);

    return res.render("auth/login", { layout: "layouts/auth.layout.ejs" });
  },
  handleLogin: async (req, res) => {
    const id = req.user.id;
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    twoFAutil(email, otp);
    await UserOtp.create({
      otp: otp,
      userId: id,
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    // res.locals.twoFA = true;
    // console.log(res.locals.twoFA);
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
    // console.log(req.user);
    console.log(res.locals.twoFA);
    console.log(req.user);
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
    console.log(otp);
    console.log(userOtp.otp);
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
  },
};
