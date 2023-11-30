var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/admin/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const adminMiddleware = require("../../http/middlewares/admin.middleware");
router.use(authMiddleware);
// router.use(adminMiddleware);
router.get("/", HomeController.index);

module.exports = router;
