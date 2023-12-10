var express = require("express");
var router = express.Router();
var HomeController = require("../../http/controllers/students/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
router.use(authMiddleware);
router.get("/", HomeController.index);

module.exports = router;
