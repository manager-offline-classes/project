const LocalStrategy = require("passport-local").Strategy;
const hash = require("../utils/hash.util");
const { User, UserSocial } = require("../models/index");
const { messageError } = require("../constants/constants.message");
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return done(null, false, { message: messageError.NO_USERS });
    }
    const check = hash.check(password, user.password);
    if (!check) {
      return done(null, false, { message: messageError.INVALID_PASSWORD });
    }
    console.log(user);
    return done(null, user);
  }
);
