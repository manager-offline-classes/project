const { LoginToken } = require("../../models/index");
module.exports = async (req, res, next) => {
  console.log(`auth middleware`);

  if (!req.user) {
    return res.redirect("/auth/login");
  } else {
    console.log(4464454);
    const loginToken = await LoginToken.findOne({
      where: {
        userId: req.user.user.id,
      },
    });
    console.log(req.cookies.loginToken);
    console.log(loginToken.token);
    if (loginToken.token === req.cookies.loginToken) {
      next();
      // return;
    } else {
      console.log(4464454);
      req.logout((err) => {
        if (err) {
          next(err);
        }
      });
      res.clearCookie("loginToken");
      // res.end();
      return res.redirect("/auth/login");
    }
  }
  // next();
};
