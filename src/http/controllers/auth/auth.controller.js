const createTokenUtil = require("../../../utils/createToken.util");
const {
  UserOtp,
  User,
  UserSocial,
  LoginToken,
} = require("../../../models/index");
const { Op } = require("sequelize");
const createOtpService = require("../../services/createOtp.service");
const forgetPwUtil = require("../../../utils/forgetPw.until");
const hashUtil = require("../../../utils/hash.util");
const jwt = require("jsonwebtoken");
const {
  messageError,
  messageSuccess,
  messageInfo,
} = require("../../../constants/constants.message");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
module.exports = {
  login: async (req, res) => {
    // console.log(`login hihihih`);
    // console.log(req.isAuthenticated());
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("msgSuccess");
    return res.render(renderPath.LOGIN_AUTH, {
      layout: "layouts/auth.layout.ejs",
      msgErr,
      msgSuccess,
      redirectPath,
    });
  },
  handleLogin: async (req, res) => {
    const id = req.user.id;
    const { email } = req.body;
    createOtpService(id, email);
    return res.redirect(redirectPath.TWOFA_AUTH);
  },
  logout: async (req, res) => {
    req.logout((err) => {
      console.log(6666);
      if (err) {
        next(err);
      }
    });
    res.clearCookie("loginToken");
    return res.redirect(redirectPath.LOGIN_AUTH);
  },
  twoFA: (req, res) => {
    const msgErr = req.flash("msgErr");
    return res.render(renderPath.TWOFA_AUTH, {
      layout: "layouts/auth.layout.ejs",
      msgErr,
      redirectPath,
    });
  },
  handleTwoFA: async (req, res) => {
    console.log(`handle TwoFA`);
    console.log(req.user);
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
        const token = await createTokenUtil(id);
        res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });
        if (req.user.typeId === 1) {
          return res.redirect(redirectPath.HOME_STUDENT);
        } else if (req.user.typeId === 2) {
          return res.redirect(redirectPath.HOME_TEACHER);
        } else if (req.user.typeId === 3) {
          return res.redirect(redirectPath.HOME_ADMIN);
        }
      }

      req.flash("msgErr", messageError.INVALID_OTP);
      res.redirect(redirectPath.TWOFA_AUTH);
    } else {
      req.flash("msgErr", messageInfo.EXPIRED_OTP);
      res.redirect(redirectPath.TWOFA_AUTH);
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
      req.flash("msgErr", messageInfo.WAIT_A_MINUTE);
      res.redirect(redirectPath.TWOFA_AUTH);
    } else {
      createOtpService(id, user.email);
      req.flash("msgErr", messageInfo.CHECK_EMAIL);
      res.redirect(redirectPath.TWOFA_AUTH);
    }
  },
  forgetFw: (req, res) => {
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("msgSuccess");
    return res.render(renderPath.FORGET_PASSWORD_AUTH, {
      layout: "layouts/auth.layout.ejs",
      msgErr,
      msgSuccess,
      redirectPath,
    });
  },
  handleForgetPw: async (req, res) => {
    const { email } = req.body;
    console.log(464048068);
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (!user) {
      req.flash("msgErr", messageError.NO_EMAILS);
      return res.redirect(redirectPath.FORGET_PASSWORD);
    }
    forgetPwUtil(email);

    req.flash("msgSuccess", messageInfo.CHECK_EMAIL);
    res.redirect(redirectPath.FORGET_PASSWORD);
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
        return res.render(renderPath.RESET_PASSWORD_AUTH, {
          layout: "layouts/auth.layout.ejs",
          msgErr,
          redirectPath,
        });
      }
    });
  },
  handleResetPw: async (req, res) => {
    const token = req.params.token;
    const { password, rePassword } = req.body;

    if (password !== rePassword) {
      console.log(60464);
      req.flash("msgErr", messageError.PASSWORD_SAME);
      res.redirect(`${redirectPath.RESET_PASSWORD}${token}`);
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
      req.flash("msgSuccess", messageSuccess.CHANGE_PASSWORD);
      res.redirect(redirectPath.LOGIN_AUTH);
    }
  },
  passportRedirect: async (req, res) => {
    console.log(`passportRedirect CB`);

    const loginToken = await LoginToken.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (loginToken.token !== req.cookies.loginToken) {
      // not logged in yet
      const token = await createTokenUtil(req.user.id);
      res.cookie("loginToken", token, { maxAge: 900000, httpOnly: true });
      if (req.user.typeId === 1) {
        return res.redirect(redirectPath.HOME_STUDENT);
      } else if (req.user.typeId === 2) {
        return res.redirect(redirectPath.HOME_TEACHER);
      } else if (req.user.typeId === 3) {
        return res.redirect(redirectPath.HOME_ADMIN);
      }
    }

    if (req.user.typeId === 1) {
      return res.redirect(redirectPath.SETTINGS_STUDENT);
    } else if (req.user.typeId === 2) {
      return res.redirect(redirectPath.SETTINGS_TEACHER);
    } else if (req.user.typeId === 3) {
      return res.redirect(redirectPath.SETTINGS_ADMIN);
    }
  },
  disableGoogle: async (req, res) => {
    const id = req.user.id;
    await UserSocial.destroy({
      where: {
        [Op.and]: [{ userId: id }, { provider: "google" }],
      },
    });
    req.flash("success", messageSuccess.DELETE_LINK);
    res.redirect(redirectPath.SETTINGS_ADMIN);
  },

  disableGithub: async (req, res) => {
    const id = req.user.id;
    await UserSocial.destroy({
      where: {
        [Op.and]: [{ userId: id }, { provider: "github" }],
      },
    });
    req.flash("success", messageSuccess.DELETE_LINK);
    res.redirect(redirectPath.SETTINGS_ADMIN);
  },

  disableFacebook: async (req, res) => {
    const id = req.user.id;
    await UserSocial.destroy({
      where: {
        [Op.and]: [{ userId: id }, { provider: "facebook" }],
      },
    });
    req.flash("success", messageSuccess.DELETE_LINK);
    res.redirect(redirectPath.SETTINGS_ADMIN);
  },
};
