module.exports = {
  login: (req, res) => {
    res.render("auth/login");
  },
  handleLogin: (req, res) => {
    if (req.user.typeId === 1) {
      return res.redirect("/");
    } else if (req.user.typeId === 2) {
      return res.redirect("/teacher");
    }
    res.redirect("/student");
  },
};
