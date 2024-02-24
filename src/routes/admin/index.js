var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/admin/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const roleMiddeware = require("../../http/middlewares/role.middleware");
const adminMiddleware = require("../../http/middlewares/admin.middleware");
const {
  validateInfo,
  validateChangePassword,
  validateAddUser,
  validateAddCourse,
  validateAddClass,
  validateUpdateClass,
  validateCreateChapter,
  validateCreateSection,
  validateCreateHomework,
  validateAddRole,
} = require("../../http/middlewares/validate.middeware");
const homeController = require("../../http/controllers/admin/home.controller");
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", HomeController.index);
// router.get("/setting", HomeController.setting);
// router.get("/setting/edit-info", HomeController.editInfo);
// router.post(
//   "/setting/edit-info",
//   validateInfo(),
//   HomeController.handleEditInfo
// );
// router.get("/setting/edit-password", HomeController.editPassword);
// router.post(
//   "/setting/edit-password",
//   validateChangePassword(),
//   HomeController.handleEditPassword
// );
// users
router.get("/users-create", HomeController.userCreate);
router.post(
  "/users-create",
  validateAddUser(),
  HomeController.handleUserCreate
);
router.get("/users-admin-list", HomeController.userAdminList);
router.get("/users-teacher-list", HomeController.userTeacherList);
router.get(
  "/users-teacher-list/calendarAll",
  HomeController.userTeacherCalendarAll
);
router.get(
  "/users-teacher-list/calendar/:id",
  HomeController.userTeacherCalendar
);

router.get("/users-student-list", homeController.userStudentList);
router.get("/export-users-excel", HomeController.exportUsersExcel);
router.get("/users-update/:id", HomeController.userUpdate);
router.patch(
  "/users-update/:id",
  validateAddUser(),
  HomeController.handleUserUpdate
);
router.delete("/users-admin-delete/:id", HomeController.userDelete);
// courses
router.get("/course-list", HomeController.courseList);
router.get("/course-list/document/:id", HomeController.document);
router.get(
  "/course-list/document/create-chapter/:id",
  HomeController.documentCreateChapter
);
router.post(
  "/course-list/document/create-chapter/:id",
  validateCreateChapter(),
  HomeController.handleDocumentCreateChapter
);
router.get(
  "/course-list/document/update-chapter/:id",
  HomeController.documentUpdateChapter
);

router.patch(
  "/course-list/document/update-chapter/:id",
  validateCreateChapter(),
  HomeController.handleDocumentUpdateChapter
);
router.delete(
  "/course-list/document/delete-chapter/:id",
  HomeController.documentDeleteChapter
);
router.get(
  "/course-list/document/create-section/:courseModuleId",
  HomeController.sectionCreate
);
router.post(
  "/course-list/document/create-section/:courseModuleId",
  validateCreateSection(),
  HomeController.handleSectionCreate
);
router.get(
  "/course-list/document/update-section/:id",
  HomeController.sectionUpdate
);
router.patch(
  "/course-list/document/update-section/:id",
  validateCreateSection(),
  HomeController.handleSectionUpdate
);
router.delete(
  "/course-list/document/delete-section/:id",
  HomeController.sectionDelete
);
router.get("/export-courses-excel", HomeController.exportCoursesExcel);
router.get("/course-create", HomeController.courseCreate);
router.post(
  "/course-create",
  validateAddCourse(),
  HomeController.handleCourseCreate
);
router.get("/course-update/:id", HomeController.courseUpdate);
router.patch(
  "/course-update/:id",
  validateAddCourse(),
  HomeController.handleCourseUpdate
);
router.delete("/course-delete/:id", HomeController.courseDelete);

// class
router.get("/class-create", HomeController.classCreate);
router.post(
  "/class-create",
  validateAddClass(),
  HomeController.handleClassCreate
);
router.get("/class-list", HomeController.classList);
router.get("/class-update/:id", HomeController.classUpdate);
router.patch(
  "/class-update/:id",
  validateUpdateClass(),
  HomeController.handleClassUpdate
);
router.delete("/class-delete/:id", HomeController.classDelete);
router.get("/class-add-student/:id", HomeController.classAddStudent);
router.post("/class-add-student/:id", HomeController.hanldeClassAddStudent);

router.get("/class-list/attendance/:id", HomeController.attendance);
router.post("/class-list/attendance/:id", HomeController.handleAttendance);
router.get("/class-list/homework/:id", HomeController.homeWork);
router.get("/class-list/add-homework/:id", HomeController.addHomeWork);
router.post(
  "/class-list/add-homework/:id",
  validateCreateHomework(),
  HomeController.hanldeAddHomeWork
);

router.get("/class-list/edit-homework/:id", HomeController.editHomework);
router.patch(
  "/class-list/edit-homework/:id",
  validateCreateHomework(),
  HomeController.handleEditHomework
);
router.delete("/class-list/delete-homework/:id", HomeController.deleteHomework);
router.get("/class-list/homework-detail/:id", HomeController.homeworkDetail);
router.post(
  "/class-list/homework-detail/:id",
  HomeController.addExerciseSubmit
);
router.post(
  "/class-list/homework-detail/reply/:id",
  HomeController.replyHomeworkDetail
);
router.delete(
  "/class-list/homework-detail/delete-reply/:id",
  HomeController.deleteReplyHomeworkDetail
);

router.get("/roles/add", HomeController.addRole);
router.post("/roles/add", validateAddRole(), HomeController.handleAddRole);

router.get("/roles", HomeController.indexRoles);
router.get("/roles/edit/:id", HomeController.editRole);
router.patch(
  "/roles/edit/:id",
  validateAddRole(),
  HomeController.handleEditRole
);

router.delete("/roles/delete/:id", HomeController.deleteRole);

router.get("/users/permissions/:id", HomeController.permission);
router.post("/users/permissions/:id", HomeController.handlePermission);

module.exports = router;
