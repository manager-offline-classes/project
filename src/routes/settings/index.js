var express = require("express");
var router = express.Router();
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const HomeController = require("../../http/controllers/settings/home.controller");
const {
  validateInfo,
  validateChangePassword,
  validateAddUser,
  validateAddCourse,
  validateAddClass,
  validateUpdateClass,
} = require("../../http/middlewares/validate.middeware");
router.use(authMiddleware);
router.get("/", HomeController.index);
router.get("/edit-info", HomeController.editInfo);
router.post("/edit-info", validateInfo(), HomeController.handleEditInfo);

router.get("/edit-password", HomeController.editPassword);
router.post(
  "/edit-password",
  validateChangePassword(),
  HomeController.handleEditPassword
);

module.exports = router;
