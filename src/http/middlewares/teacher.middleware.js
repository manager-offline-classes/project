module.exports = (req, res, next) => {
  if (req.user.typeId === 1) {
    return res.redirect("/student");
  } else if (req.user.typeId === 2) {
    next();
  } else if (req.user.typeId === 3) {
    return res.redirect("/admin");
  }
};
