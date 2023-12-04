// require("dotenv").config();
var FacebookStrategy = require("passport-facebook");
console.log("CallbackUrl: " + process.env.FACEBOOK_CALLBACK_URL);
module.exports = new FacebookStrategy(
  {
    clientID: process.env["FACEBOOK_CLIENT_ID"],
    clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    state: true,
    enableProof: true,
    profileFields: ["email", "displayName", "name"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { displayName, emails, id } = profile;
    console.log(468464);
    console.log(profile);

    const userSocial = await UserSocial.findOne({
      where: { providerId: id },
    });
    console.log(userSocial);
    const user = await User?.findByPk(userSocial?.userId);
    console.log(user);
    console.log(req.isAuthenticated());
    // Status : not logged in yet
    if (!req.isAuthenticated()) {
      // if (!userSocial) {
      //   return cb(null, false, {
      //     message: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
      //   });
      // }
      // console.log(userSocial);

      if (user) {
        console.log(`Gan user vao req`);
        return cb(null, { user, userSocial });
      } else {
        req.flash(
          "error",
          "Đăng nhập bằng Facebook không thành công! tài khoản chưa được liên kết.Tài khoản chưa được liên kết"
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
          "Liên kết thất bại! Tài khoản facebook này đã được liên kết với một tài khoản khác."
        );
        req.res.redirect("/admin");
        return;
      } else {
        UserSocial.create({
          userId: req.user.user.id,
          provider: "facebook",
          providerId: id,
        });
        req.flash("success", "Liên kết thành công!");

        req.res.redirect("/admin");
        return;
      }
    }
  }
);
