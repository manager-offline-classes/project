module.exports = (req, res, next) => {
  console.log(`guest middleware`);
  console.log(req.user);
  console.log(`guest middleware`);

  if (req.user) {
    console.log(`guest middleware`);

    if (!req.user.user) {
      next();
    }
    if (req.user.user.typeId === 1) {
      return res.redirect("/student");
    } else if (req.user.user.typeId === 2) {
      return res.redirect("/teacher");
    } else if (req.user.user.typeId === 3) {
      return res.redirect("/admin");
    }
  }
  next();
};
