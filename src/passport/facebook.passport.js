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
          "Liên kết thất bại! Tài khoản facebook này đã được liên kết với một tài khoản khác."
        );
        return cb(null, user);
      } else {
        UserSocial.create({
          userId: req.user.id,
          provider: "facebook",
          providerId: id,
        });
        return cb(null, user, {
          message: "Liên kết thành công.",
        });
      }
    }
  }
);
