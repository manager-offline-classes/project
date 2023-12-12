var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/admin/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const {
  validateInfo,
  validateChangePassword,
  validateAddUser,
} = require("../../http/middlewares/validate.middeware");
const homeController = require("../../http/controllers/admin/home.controller");
router.use(authMiddleware);

// router.use(adminMiddleware);
router.get("/", HomeController.index);
router.get("/setting", HomeController.setting);
router.get("/setting/edit-info", HomeController.editInfo);
router.post(
  "/setting/edit-info",
  validateInfo(),
  HomeController.handleEditInfo
);
router.get("/setting/edit-password", HomeController.editPassword);
router.post(
  "/setting/edit-password",
  validateChangePassword(),
  HomeController.handleEditPassword
);
// user
router.get("/users-create", HomeController.userCreate);
router.post(
  "/users-create",
  validateAddUser(),
  HomeController.handleUserCreate
);
router.get("/users-admin-list", HomeController.userAdminList);
router.get("/users-teacher-list", HomeController.userTeacherList);
router.get("/users-student-list", homeController.userStudentList);
router.get("/users-update/:id", HomeController.userUpdate);
router.post(
  "/users-update/:id",
  validateAddUser(),
  HomeController.handleUserUpdate
);
router.delete("/users-admin-delete/:id", HomeController.userDelete);

module.exports = router;
