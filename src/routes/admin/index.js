var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/teachers/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
router.use(authMiddleware);
router.get("/", HomeController.index);

module.exports = router;
