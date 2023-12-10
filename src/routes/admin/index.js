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
router.get("/user-list", HomeController.userList);
router.get("/user-create", HomeController.userCreate);
router.post("/user-create", validateAddUser(), HomeController.handleUserCreate);
router.get("/user-update/:id", HomeController.userUpdate);
router.post(
  "/user-update/:id",
  validateAddUser(),
  HomeController.handleUserUpdate
);
router.delete("/user-delete/:id", HomeController.userDelete);

module.exports = router;
