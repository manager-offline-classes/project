var express = require("express");
var router = express.Router();
var AuthController = require("../../http/controllers/auth/auth.controller");
const passport = require("passport");
const guestMiddleware = require("../../http/middlewares/guest.middleware");
const twoFAMiddleware = require("../../http/middlewares/twoFA.middleware");

const authMiddleware = require("../../http/middlewares/auth.middleware");
const createTokenUtil = require("../../utils/createToken.util");
const authController = require("../../http/controllers/auth/auth.controller");
const {
  validateLoginAccount,
  validateForgetPassword,
  validateTwoFA,
  validateResetPassword,
} = require("../../http/middlewares/validate.middeware");
/* GET home page. */
router.get("/login", guestMiddleware, AuthController.login);
router.post(
  "/login",
  validateLoginAccount(),
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    badRequestMessage: "Vui lòng nhập đầy đủ thông tin",
  }),
  AuthController.handleLogin
);
router.get("/twoFA", twoFAMiddleware, AuthController.twoFA);
router.post("/twoFA", validateTwoFA(), AuthController.handleTwoFA);
router.get("/logout", AuthController.logout);
router.get("/resendOtp", twoFAMiddleware, AuthController.resendOtp);
router.get("/forgetPw", guestMiddleware, AuthController.forgetFw);
router.post(
  "/forgetPw",
  validateForgetPassword(),
  AuthController.handleForgetPw
);
router.get("/resetPw/:token", AuthController.resetPw);
router.post(
  "/resetPw/:token",
  validateResetPassword(),
  AuthController.handleResetPw
);

router.get("/google/redirect", passport.authenticate("google"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successFlash: true,
  }),
  authController.passportRedirect
);

router.get("/disableGoogle", authController.disableGoogle);

router.get("/github/redirect", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  authController.passportRedirect
);
router.get("/disableGithub", authController.disableGithub);

router.get("/facebook/redirect", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }),
  authController.passportRedirect
);

router.get("/disableFacebook", authController.disableFacebook);
router.get(
  "/change-first-password",
  twoFAMiddleware,
  authController.changeFirstPw
);
router.post(
  "/change-first-password",
  validateResetPassword(),
  authController.handleChangeFirstPw
);

module.exports = router;
