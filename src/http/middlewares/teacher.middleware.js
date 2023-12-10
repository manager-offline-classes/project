module.exports = (req, res) => {
  console.log(989898);
  console.log(`admin middleware`);
  console.log(req.user);
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(res.locals.previousUrl);
  if (req.user.typeId === 2) {
    next();
  }

  res.redirect(`${res.locals.previousUrl}`);
};
