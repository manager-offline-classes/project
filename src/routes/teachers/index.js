var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/teachers/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const teacherMiddleware = require("../../http/middlewares/teacher.middleware");
router.use(authMiddleware);
// router.use(teacherMiddleware);
router.get("/", HomeController.index);

module.exports = router;
