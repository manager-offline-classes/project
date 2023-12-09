const LocalStrategy = require("passport-local").Strategy;
const hash = require("../utils/hash.util");
const { User, UserSocial } = require("../models/index");
const { messageError } = require("../constants/constants.message");
const { validationResult } = require("express-validator");
module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async function (req, email, password, done) {
    console.log(`local passport`);
    const user = await User.findOne({ where: { email: email } });
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return done(null, user);
    } else {
      const error = errors.array()[0].msg;
      return done(null, false, { message: error });
    }

    // if (!user) {
    //   return done(null, false, { message: error });
    // }
    // const check = hash.check(password, user.password);
    // if (!check) {
    //   return done(null, false, { message: error });
    // }
    // console.log(user);
    // return done(null, user);
  }
);
