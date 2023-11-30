const GoogleStrategy = require("passport-google-oidc");
const { UserSocial, User } = require("../models/index");
module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (issuer, profile, cb) => {
    const { displayName, emails } = profile;
    const [{ value: email }] = emails;
    //Xử lý tương tác với Database
    console.log(profile);
    //1. Kiểm tra trong table providers có Provider hay chưa?
    const provider = "google";
    let providerDetail = await UserSocial.findOne({
      where: {
        provider: provider,
      },
    });

    //2. Insert nếu không có hoặc lấy id nếu đã có
    if (!providerDetail) {
      providerDetail = await UserSocial.create({
        provider: provider,
      });
    }
    const userId = providerDetail.userId;
    let user = await User.findByPk(userId);
    console.log(user.name);
    cb(null, user);
  }
);
