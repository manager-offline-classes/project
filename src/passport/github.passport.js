const GitHubStrategy = require("passport-github").Strategy;
const { UserSocial, User } = require("../models/index");
module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_URL,
    profileFields: ["email", "username", "_raw"],

    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, cb) => {
    console.log(`github passport`);
    console.log(8989899);
    console.log(cb);

    const { id } = profile;
    // kiểm tra mxh này có trong db khong
    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    // console.log(userSocial);
    console.log(req.isAuthenticated());
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      const user = await User.findByPk(userSocial?.userId);
      if (user) {
        // mxh đã lk với user này
        return cb(null, user);
      } else {
        return cb(null, false, {
          message: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
        });
      }
    }
    // status : log in
    else {
      let user = req.user;
      if (userSocial) {
        // không hoạt động với passport 0.0.6
        req.flash(
          "error",
          "Liên kết thất bại! Tài khoản github này đã được liên kết với một tài khoản khác."
        );
        return cb(null, user);
      } else {
        UserSocial.create({
          userId: req.user.id,
          provider: "github",
          providerId: id,
        });
        return cb(null, user, {
          message: "Liên kết thành công.",
        });
      }
    }
  }
);
