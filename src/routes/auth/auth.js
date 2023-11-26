var express = require("express");
var router = express.Router();
var AuthController = require("../../http/controllers/auth/auth.controller");
const passport = require("passport");
const guestMiddleware = require("../../http/middlewares/guest.middleware");
/* GET home page. */
router.get("/login", guestMiddleware, AuthController.login);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  AuthController.handleLogin
);

module.exports = router;
