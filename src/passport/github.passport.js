const GitHubStrategy = require("passport-github").Strategy;
const { UserSocial, User } = require("../models/index");

const {
  messageError,
  messageSuccess,
} = require("../constants/constants.message");
module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_URL,
    profileFields: ["email", "username", "_raw"],

    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    const { id } = profile;
    // kiểm tra mxh này có trong db khong
    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    // console.log(userSocial);
    console.log(id);
    console.log(req.isAuthenticated());
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      console.log(`chua lk`);
      const user = await User.findByPk(userSocial?.userId);
      if (user) {
        // mxh đã lk với user này
        return cb(null, user);
      } else {
        console.log(`chua lk 1`);
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
          provider: "github",
          providerId: id,
        });
        req.flash("success", messageSuccess.SUCCESSFUL_LINK);
        return cb(null, user);
      }
    }
  }
);
