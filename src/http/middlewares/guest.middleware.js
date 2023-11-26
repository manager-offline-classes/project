module.exports = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  next();
};
