const GitHubStrategy = require("passport-github").Strategy;
const { UserSocial, User } = require("../models/index");
module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CLIENT_URL,
    profileFields: ["email", "username", "_raw"],
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log(profile.id);

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
