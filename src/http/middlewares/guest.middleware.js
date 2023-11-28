module.exports = (req, res, next) => {
  if (req.user) {
    console.log(`guest middleware`);
    if (req.user.typeId === 1) {
      return res.redirect("/student");
    } else if (req.user.typeId === 2) {
      return res.redirect("/teacher");
    }
  }
  next();
};
