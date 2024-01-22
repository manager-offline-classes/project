const GoogleStrategy = require("passport-google-oidc");
const { UserSocial, User } = require("../models/index");
// const createTokenUtil = require("../utils/createToken.util");
const {
  messageError,
  messageSuccess,
} = require("../constants/constants.message");
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
    passReqToCallback: true,
  },
  async (req, issuer, profile, cb) => {
    const { displayName, emails, id } = profile;
    // kiểm tra mxh này có trong db khong
    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    // console.log(userSocial);
    console.log(req.user);
    console.log(req.isAuthenticated());
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      const user = await User.findByPk(userSocial?.userId);
      if (user) {
        // mxh đã lk với user này
        return cb(null, user);
      } else {
        return cb(null, false, {
          message: messageError.ACCOUNT_NOT_LINK,
        });
      }
    }
    // status : log in
    else {
      let user = req.user;
      if (userSocial) {
        // không hoạt động với passport 0.0.6
        req.flash("error", messageError.ACCOUNT_LINKED);
        return cb(null, user);
      } else {
        UserSocial.create({
          userId: req.user.id,
          provider: "google",
          providerId: id,
        });
        req.flash("success", messageSuccess.SUCCESSFUL_LINK);
        return cb(null, user);
      }
    }
  }
);
