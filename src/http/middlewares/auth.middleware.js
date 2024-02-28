const { LoginToken } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = async (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  } else {
    const loginToken = await LoginToken.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (
      loginToken?.token === req.cookies.loginToken &&
      req.cookies.loginToken
    ) {
      console.log(324234);
      next();
      // return;
    } else {
      console.log(4464454);
      req.flash("error", messageError.ONE_DEVICES);
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
