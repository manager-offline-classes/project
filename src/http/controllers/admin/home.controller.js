module.exports = {
  index: async (req, res) => {
    const user = req.user;
    console.log(9099099);
    console.log(req.user.name);
    console.log(req.baseUrl);
    console.log(`http://localhost:${process.env.PORT}${req.baseUrl}`);
    return res.render("admin/index", { user });
  },
};
