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
    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    const user = await User?.findByPk(userSocial?.userId);
    console.log(req.isAuthenticated());
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      if (user) {
        console.log(`Gan user vao req`);
        console.log(user.id);
        console.log(userSocial.id);
        return cb(null, { user, userSocial });
      } else {
        req.flash(
          "error",
          "Đăng nhập bằng Github không thành công! tài khoản chưa được liên kết.Tài khoản chưa được liên kết"
        );
        req.res.redirect("/auth/login");
        return;
      }
    }
    // status : log in
    else {
      console.log(6666);
      if (userSocial) {
        console.log(888);
        req.flash(
          "error",
          "Liên kết thất bại! Tài khoản google này đã được liên kết với một tài khoản khác."
        );
        req.res.redirect("/admin");
        return;
      } else {
        UserSocial.create({
          userId: req.user.user.id,
          provider: "github",
          providerId: id,
        });
        req.flash("success", "Liên kết thành công!");

        req.res.redirect("/admin");
        return;
      }
    }
  }
);
