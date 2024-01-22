module.exports = (req, res, next) => {
  if (req.user.typeId === 1) {
    next();
  } else if (req.user.typeId === 2) {
    return res.redirect("/admin");
  } else if (req.user.typeId === 3) {
    return res.redirect("/admin");
  }
};
