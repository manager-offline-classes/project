var FacebookStrategy = require("passport-facebook");
module.exports = new FacebookStrategy(
  {
    clientID: process.env["FACEBOOK_CLIENT_ID"],
    clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
    callbackURL: process.env.FACEBOOK_CLIENT_URL,
    state: true,
    enableProof: true,
    profileFields: ["email", "displayName", "name"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { displayName, email, profileUrl } = profile;
    console.log(email);
    console.log(profile);

    let user = await User.findOne({
      where: {
        email: "nam2002bv@gmail.com",
      },
    });
    console.log(user);

    console.log(496049546);
    return cb(null, user);
  }
);
