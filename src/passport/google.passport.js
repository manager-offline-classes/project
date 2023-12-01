const GoogleStrategy = require("passport-google-oidc");
const { UserSocial, User } = require("../models/index");
const facebookPassport = require("./facebook.passport");
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (issuer, profile, cb) => {
    const { displayName, emails, id } = profile;
    const [{ value: email }] = emails;
    console.log(profile);
    console.log(email);
    const userSocial = await UserSocial.findOne({ where: { providerId: id } });
    if (!userSocial) {
      return cb(null, false, {
        message: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
      });
    }
    const user = await User.findByPk(14);
    return cb(null, user);
  }
);
