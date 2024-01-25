require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { User, UserSocial } = require("./models/index");

const authMiddleware = require("./http/middlewares/auth.middleware");
const studentsRouter = require("./routes/students/index");
const teachersRouter = require("./routes/teachers/index");
const authRouter = require("./routes/auth/auth");
const adminRouter = require("./routes/admin/index");
const settingsRouter = require("./routes/settings/index");

const localPassport = require("./passport/LocalPassport");
const googlePassport = require("./passport/google.passport");
const githubPassport = require("./passport/github.passport");
const facebookPassport = require("./passport/facebook.passport");
const passport = require("passport");
var app = express();

app.use(
  session({
    secret: "project",
    resave: false,
    saveUninitialized: true,
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findByPk(id);
  done(null, user);
});

app.use(passport.session());
app.use(passport.initialize());
passport.use("local", localPassport);
passport.use("google", googlePassport);
passport.use("github", githubPassport);
passport.use("facebook", facebookPassport);

// view engine setup
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.use(expressLayouts);
// app.set("authLayout", "layouts/auth.layout.ejs"); //set layout default
app.set("layout", "layouts/master.layout.ejs"); //set layout default

app.use(flash());

app.use("/auth", authRouter);

// app.use(authMiddleware);
app.use("/admin", adminRouter);
app.use("/student", studentsRouter);
app.use("/teacher", teachersRouter);
app.use("/settings", settingsRouter);
app.use("/", (req, res) => {
  // return res.redirect("/admin");
  return res.send(
    "Trang không tồn tại! Vui lòng truy cập http://127.0.0.1:3000/auth/login "
  );
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log("Error: ", err);
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
