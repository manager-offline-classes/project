const { LoginToken } = require("../../models/index");
module.exports = async (req, res, next) => {
  console.log(`guest middleware`);

  if (req.user) {
    console.log(`guest middleware`);

    if (!req.user) {
      next();
    }
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
      if (req.user.typeId === 1) {
        return res.redirect("/student");
      } else if (req.user.typeId === 2) {
        return res.redirect("/teacher");
      } else if (req.user.typeId === 3) {
        console.log(24234);
        return res.redirect("/admin");
      }
    }
  }
  next();
};
