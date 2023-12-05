const LocalStrategy = require("passport-local").Strategy;
const hash = require("../utils/hash.util");
const { User, UserSocial } = require("../models/index");
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return done(null, false, { message: "Không tồn tại tài khoản" });
    }
    const check = hash.check(password, user.password);
    if (!check) {
      return done(null, false, { message: "Mật khẩu không chính xác" });
    }
    console.log(user);
    return done(null, user);
  }
);
