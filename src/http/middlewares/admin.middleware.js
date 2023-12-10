module.exports = (req, res) => {
  res.locals.previousUrl = req.baseUrl;
  console.log(res.locals.previousUrl);
  //   console.log(989898);
  //   console.log(`admin middleware`);
  //   console.log(req.user);
  //   if (req.user.typeId === 2 || req.user.typeId === 1) {
  //     return res.redirect("/admin");
  //   }
  next();
};
