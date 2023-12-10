const { LoginToken } = require("../../models/index");
module.exports = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  } else {
    const loginToken = await LoginToken.findOne({
      where: {
        userId: req.user.id,
      },
    });
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
