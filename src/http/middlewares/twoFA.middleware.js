const { LoginToken } = require("../../models/index");
module.exports = async (req, res, next) => {
  console.log(`two FA`);
  console.log(949494994);
  if (!req.user) {
    return res.redirect("/auth/login");
  } else {
    const loginToken = await LoginToken.findOne({
      where: {
        userId: req.user.id,
      },
    });
    console.log(req.cookies.loginToken);
    console.log(loginToken.token);
    if (loginToken.token === req.cookies.loginToken) {
      if (req.user.typeId === 1) {
        return res.redirect("/student");
      } else if (req.user.typeId === 2) {
        return res.redirect("/teacher");
      }
    } else {
      console.log(4464454);
      res.clearCookie("loginToken");
      // res.end();
      next();
    }
  }
  // next();
};
