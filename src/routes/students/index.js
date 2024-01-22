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

module.exports = router;
