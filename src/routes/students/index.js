var express = require("express");
var router = express.Router();
var HomeController = require("../../http/controllers/students/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const roleMiddeware = require("../../http/middlewares/role.middleware");
const studentMiddleware = require("../../http/middlewares/student.middeware");
router.use(authMiddleware);
router.use(studentMiddleware);
router.get("/", HomeController.index);
router.get("/class-list", HomeController.classList);
router.get("/course-list/document/:id", HomeController.document);
router.get("/class-list/attendance/:id", HomeController.attendance);

router.get("/class-list/homework/:id", HomeController.homeWork);
router.get("/class-list/homework-detail/:id", HomeController.homeworkDetail);
router.post(
  "/class-list/homework-detail/:id",
  HomeController.addExerciseSubmit
);
module.exports = router;
