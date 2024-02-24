var express = require("express");
var router = express.Router();
const HomeController = require("../../http/controllers/teachers/home.controller");
/* GET home page. */
const authMiddleware = require("../../http/middlewares/auth.middleware");
const teacherMiddleware = require("../../http/middlewares/teacher.middleware");
const roleMiddeware = require("../../http/middlewares/role.middleware");
const {
  validateCreateChapter,
  validateCreateSection,
  validateCreateHomework,
} = require("../../http/middlewares/validate.middeware");
router.use(authMiddleware);
router.use(teacherMiddleware);
router.get("/", HomeController.index);
router.get("/class-list", HomeController.classList);
router.get("/class-list/view-student/:id", HomeController.viewStudent);
router.get("/class-list/calendar", HomeController.calendar);
router.get("/class-list/attendance/:id", HomeController.attendance);
router.post("/class-list/attendance/:id", HomeController.handleAttendance);

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

router.get("/student-list", HomeController.studentList);
router.get(
  "/student-list/update-learning-status/:id",
  HomeController.updateLearningStatus
);
router.patch(
  "/student-list/update-learning-status/:id",
  HomeController.handleUpdateLearningStatus
);

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

module.exports = router;
