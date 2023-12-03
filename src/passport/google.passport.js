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
    console.log(issuer);

    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    console.log(userSocial);
    const user = await User?.findByPk(userSocial?.userId);
    console.log(user);
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      // if (!userSocial) {
      //   return cb(null, false, {
      //     message: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
      //   });
      // }
      // console.log(userSocial);

      return cb(null, { user, userSocial });
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
          provider: "google",
          providerId: id,
        });
        req.flash("success", "Liên kết thành công!");

        req.res.redirect("/admin");
        return;
      }
    }
  }
);
