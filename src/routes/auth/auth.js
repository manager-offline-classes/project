var express = require("express");
var router = express.Router();
var AuthController = require("../../http/controllers/auth/auth.controller");
const passport = require("passport");
const guestMiddleware = require("../../http/middlewares/guest.middleware");
const twoFAMiddleware = require("../../http/middlewares/twoFA.middleware");

const authMiddleware = require("../../http/middlewares/auth.middleware");
/* GET home page. */
router.get("/login", guestMiddleware, AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    badRequestMessage: "Vui lòng nhập đầy đủ thông tin",
  }),
  AuthController.handleLogin
);
router.get("/twoFA", twoFAMiddleware, AuthController.twoFA);
router.post("/twoFA", AuthController.handleTwoFA);
router.get("/logout", AuthController.logout);
router.get("/resendOtp", twoFAMiddleware, AuthController.resendOtp);

module.exports = router;
