const { LoginToken } = require("../../models/index");
module.exports = async (req, res, next) => {
  console.log(`two FA middleware`);
  if (!req.user) {
    return res.redirect("/auth/login");
  } else {
    const loginToken = await LoginToken.findOne({
      where: {
        userId: req.user.user.id,
      },
    });
    console.log(req.cookies.loginToken);
    console.log(!loginToken);
    if (!loginToken) {
      next();
    } else {
      if (loginToken.token === req.cookies.loginToken) {
        if (req.user.typeId === 1) {
          return res.redirect("/student");
        } else if (req.user.typeId === 2) {
          return res.redirect("/teacher");
        } else if (req.user.typeId === 3) {
          return res.redirect("/admin");
        }
      } else {
        res.clearCookie("loginToken");
        // res.end();
        next();
      }
    }
  }
  // next();
};
