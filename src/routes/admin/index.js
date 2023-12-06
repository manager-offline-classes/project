var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/admin/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
// const adminMiddleware = require("../../http/middlewares/admin.middleware");
router.use(authMiddleware);

// router.use(adminMiddleware);
router.get("/", HomeController.index);
router.get("/setting", HomeController.setting);
router.get("/setting/edit-info", HomeController.editInfo);
router.post("/setting/edit-info", HomeController.handleEditInfo);
router.get("/setting/edit-password", HomeController.editPassword);
router.post("/setting/edit-password", HomeController.handleEditPassword);

module.exports = router;
