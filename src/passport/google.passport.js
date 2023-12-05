const GoogleStrategy = require("passport-google-oidc");
const { UserSocial, User } = require("../models/index");
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
    console.log(468464);
    console.log(profile);

    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    // console.log(userSocial);
    console.log(req.isAuthenticated());
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      const user = await User?.findByPk(userSocial?.userId);
      // console.log(user);
      if (user) {
        console.log(`Gan user vao req`);
        return cb(null, { user, userSocial });
      } else {
        // req.flash(
        //   "error",
        //   "Đăng nhập bằng Google không thành công! tài khoản chưa được liên kết.Tài khoản chưa được liên kết"
        // );
        // req.res.redirect("/auth/login");
        // return;
        return cb(null, false, {
          message: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
        });
      }
    }
    // status : log in
    else {
      let user = req.user.user;
      if (userSocial) {
        console.log(888);
        let userSocial = req.user.userSocial;
        // không hoạt động với passport 0.0.6
        req.flash(
          "error",
          "Liên kết thất bại! Tài khoản google này đã được liên kết với một tài khoản khác."
        );
        return cb(null, { cb, userSocial });
        // req.res.redirect("/admin");
        // return;
      } else {
        UserSocial.create({
          userId: req.user.user.id,
          provider: "google",
          providerId: id,
        });
        const userSocial = null;
        // không hoạt động với passport 0.0.6
        req.flash("success", "Liên kết thành công");
        return cb(null, { user, userSocial });
      }
    }
  }
);
