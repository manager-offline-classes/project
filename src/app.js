require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const { User } = require("./models/index");

const studentsRouter = require("./routes/students/index");
const teachersRouter = require("./routes/teachers/index");
const authRouter = require("./routes/auth/auth");
const authMiddleware = require("./http/middlewares/auth.middleware");

const localPassport = require("./passport/LocalPassport");
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

passport.deserializeUser(function (id, done) {
  const user = User.findByPk(id);
  done(null, user);
});
app.use(passport.session());
app.use(passport.initialize());
passport.use("local", localPassport);

// view engine setup
app.set("views", path.join(__dirname, "resourses/views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/auth", authRouter);
app.use(authMiddleware);
app.use("/", studentsRouter);
app.use("/teacher", teachersRouter);
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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
