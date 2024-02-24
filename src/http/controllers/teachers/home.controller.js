const {
  UserSocial,
  User,
  Class,
  Course,
  StudentsClasses,
  Type,
  LearningStatus,
  CourseModule,
  ModuleDocument,
  TeacherCalendar,
  ExercisesSubmit,
  Exercises,
} = require("../../../models/index");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
const moment = require("moment");

const { getPaginateUrl } = require("../../../utils/url.util");
const { Op } = require("sequelize");
const studentsClassesService = require("../../services/studentsClasses.services");
const classesService = require("../../services/classes.services");
const userService = require("../../services/users.services");
const learningStatusService = require("../../services/learningStatus.services");
const coursesService = require("../../services/courses.services");
const courseModuleService = require("../../services/courseModule.services");
const moduleDocumentService = require("../../services/moduleDocument.services");
const studentAttendanceService = require("../../services/studentAttendance.service");
const exerciseService = require("../../services/exercises.service");
const exerciseSubmitService = require("../../services/exerciseSubmit.service");
const {
  messageSuccess,
  messageInfo,
  messageError,
} = require("../../../constants/constants.message");
const validateUtil = require("../../../utils/validate.util");

const { validationResult } = require("express-validator");
module.exports = {
  index: async (req, res) => {
    const user = req.user;
    const students = await User.findAndCountAll({
      where: {
        typeId: 1,
      },
    });
    const classes = await Class.findAndCountAll();
    const courses = await Course.findAndCountAll();
    console.log(user.id);
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    console.log(54654654);
    console.log(socials);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    return res.render(renderPath.HOME_TEACHER, {
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
      students,
      classes,
      courses,
    });
  },
  classList: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const { keyword } = req.query;
    let filters = {
      where: {},
    };
    if (keyword) {
      filters.where = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      };
    }
    const countClass = await classesService.getClassAndCountByCondition(
      filters.where,
      [
        {
          model: Course,
        },
        {
          model: User,
          where: { id: user.id }, // Chỉ lấy lớp học liên quan đến người dùng có ID là userId
        },
      ]
    );
    const perPage = +process.env.PER_PAGE;
    const totalCount = countClass.count;
    const totalPages = Math.ceil(totalCount / perPage);
    let { page } = req.query;
    if (page < 1 || page > totalPages || !page) {
      page = 1;
    }
    let offset = (page - 1) * perPage;

    const classList = await Class.findAll({
      include: [
        {
          model: Course,
        },
        {
          model: User,
          where: { id: user.id }, // Chỉ lấy lớp học liên quan đến người dùng có ID là userId
        },
      ],
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });
    console.log(classList);
    res.render(renderPath.TEACHER_CLASS_LIST, {
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      classList,
      moment,
      offset,
      req,
      totalPages,
      page,
      getPaginateUrl,
    });
  },
  viewStudent: async (req, res) => {
    const user = req.user;
    const classId = req.params.id;

    const { keyword } = req.query;
    let filters = {
      where: {},
    };
    if (keyword) {
      filters.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const StudentsClasses =
      await studentsClassesService.getStudentsClassesByClassId(classId, {
        model: User,
        where: filters.where,
      });
    // console.log(StudentsClasses[0].User.name);
    res.render(renderPath.VIEW_STUDENT_IN_CLASS, {
      user,
      redirectPath,
      StudentsClasses,
      req,
    });
  },
  calendar: async (req, res) => {
    const user = req.user;
    const teacherId = user.id;
    const teacherCalendars = await classesService.getTeacherCalendarByTeacherId(
      teacherId,
      Class
    );
    const calendarArray = [];
    teacherCalendars.forEach((calendar) => {
      console.log(calendar.Class.name);
      console.log(calendar.scheduleStartDate);
      calendarArray.push({
        title: calendar.Class.name,
        start: calendar.scheduleStartDate,
      });
    });
    console.log(4564654);
    console.log(calendarArray);
    res.render(renderPath.TEACHER_CALANDER, {
      user,
      redirectPath,
      calendarArray,
    });
  },
  attendance: async (req, res) => {
    const user = req.user;
    const msgSuccess = req.flash("success");
    const classId = req.params.id;
    const classItem = await classesService.getClassById(classId, [
      {
        model: TeacherCalendar,
      },
      {
        model: StudentsClasses,
        include: {
          model: User,
        },
      },
    ]);
    const teacherCalendars = classItem.TeacherCalendars;
    const stlClses = classItem.StudentsClasses;
    const studentsAttendances = await studentAttendanceService.getByClassId(
      classId
    );
    const arrayAttendances = [];
    studentsAttendances.forEach((attendance) => {
      const data = `${moment(attendance.dateLearning).format("YYYY-MM-DD")}||${
        attendance.studentId
      }||${attendance.classId}${attendance.status}`;
      arrayAttendances.push(data);
    });
    // console.log(stlClses[0].User.name);
    res.render(renderPath.TEACHER_ATTENDANCE, {
      user,
      msgSuccess,
      redirectPath,
      classItem,
      teacherCalendars,
      moment,
      stlClses,
      arrayAttendances,
    });
  },
  handleAttendance: async (req, res) => {
    console.log(req.body);
    const classId = req.params.id;
    const { attendance } = req.body;
    await studentAttendanceService.destroyByClassId(classId);
    for (elm of attendance) {
      if (elm) {
        console.log(elm);
        const attendanceItem = elm.split("||");
        console.log(attendanceItem);
        await studentAttendanceService.create(
          attendanceItem[0],
          1,
          +attendanceItem[1],
          +classId,
          +attendanceItem[2]
        );
      }
    }
    req.flash("success", messageSuccess.ATTENDANCE);
    res.redirect(`${redirectPath.TEACHER_ATTENDANCE}${classId}`);
  },

  courseList: async (req, res) => {
    const user = req.user;
    const msgSuccess = req.flash("success");
    const { keyword } = req.query;
    let filters = {
      where: {},
    };
    if (keyword) {
      filters.where = {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      };
    }
    console.log(filters.where);

    //  paginate
    const teacherCount = await userService.getUser(
      { id: user.id },
      {
        model: Course,
        where: filters.where,
      }
    );
    console.log(12313);
    console.log(teacherCount);
    // const countCourse = await Course.findAndCountAll({
    //   include: {
    //     model: User,
    //   },
    //   where: filters.where,
    // });
    const perPage = +process.env.PER_PAGE;
    const totalCount = teacherCount.Courses.length;
    console.log(totalCount);
    const totalPages = Math.ceil(totalCount / perPage);
    let { page } = req.query;
    if (page < 1 || page > totalPages || !page) {
      page = 1;
    }
    let offset = (page - 1) * perPage;

    // const courseList = await Course.findAll({
    //   include: {
    //     model: User,
    //   },
    //   where: filters.where,
    //   order: [["createdAt"]],
    //   offset: offset,
    //   limit: perPage,
    // });

    const teacher = await userService.getUser(
      { id: user.id },
      {
        model: Course,
        where: filters.where,
        order: [["createdAt"]],
        offset: offset,
        limit: perPage,
      }
    );
    const courseList = teacher.Courses;

    res.render(renderPath.TEACHER_COURSE_LIST, {
      user,
      req,
      msgSuccess,
      courseList,
      redirectPath,
      getPaginateUrl,
      totalPages,
      page,
      offset,
    });
  },
  document: async (req, res) => {
    const user = req.user;
    const courseId = req.params.id;
    const course = await coursesService.getCoursesById(courseId, {
      model: CourseModule,
      include: {
        model: ModuleDocument,
      },
    });
    console.log(course);
    const msgSuccess = req.flash("success");
    res.render(renderPath.TEACHER_COURSE_DOCUMENT, {
      user,
      redirectPath,
      msgSuccess,
      course,
      messageInfo,
    });
  },
  documentCreateChapter: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const courseId = req.params.id;
    const course = await coursesService.getCoursesById(courseId);
    res.render(renderPath.TEACHER_DOCUMENT_CREATE_CHAPTER, {
      user,
      redirectPath,
      msgErr,
      course,
      validateUtil,
      errors,
    });
  },
  handleDocumentCreateChapter: async (req, res) => {
    const errors = validationResult(req);
    const courseId = req.params.id;
    if (errors.isEmpty()) {
      const { name } = req.body;
      await courseModuleService.createCourseModule(name, courseId);
      req.flash("success", messageSuccess.CREATE);
      res.redirect(`${redirectPath.TEACHER_DOCUMENT}${courseId}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(
        `${redirectPath.TEACHER_DOCUMENT_CREATE_CHAPTER}${courseId}`
      );
    }
  },

  documentUpdateChapter: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const courseModuleId = req.params.id;
    const courseModule = await courseModuleService.getByPk(courseModuleId, {
      model: Course,
    });
    res.render(renderPath.TEACHER_DOCUMENT_UPDATE_CHAPTER, {
      user,
      redirectPath,
      msgErr,
      errors,
      validateUtil,
      courseModule,
    });
  },
  handleDocumentUpdateChapter: async (req, res) => {
    const errors = validationResult(req);

    const courseModuleId = req.params.id;
    if (errors.isEmpty()) {
      const { name } = req.body;
      await courseModuleService.updateById({ name: name }, courseModuleId);
      const courseModule = await courseModuleService.getByPk(courseModuleId, {
        model: Course,
      });
      req.flash("success", messageSuccess.UPDATE);
      res.redirect(`${redirectPath.TEACHER_DOCUMENT}${courseModule.Course.id}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(
        `${redirectPath.TEACHER_DOCUMENT_UPDATE_CHAPTER}${courseModuleId}`
      );
    }
  },
  documentDeleteChapter: async (req, res) => {
    const courseModuleId = req.params.id;
    const courseModule = await courseModuleService.getByPk(courseModuleId, {
      model: Course,
    });
    await courseModuleService.destroyById(courseModuleId);
    req.flash("success", messageSuccess.DELETE);
    res.redirect(`${redirectPath.TEACHER_DOCUMENT}${courseModule.Course.id}`);
  },

  sectionCreate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");

    const errors = req.flash("errors");
    const courseModuleId = req.params.courseModuleId;
    const courseModule = await courseModuleService.getByPk(courseModuleId, {
      model: Course,
    });
    console.log(courseModuleId);
    res.render(renderPath.TEACHER_DOCUMENT_CREATE_SECTION, {
      user,
      redirectPath,
      msgErr,
      validateUtil,
      errors,
      courseModule,
    });
  },
  handleSectionCreate: async (req, res) => {
    const errors = validationResult(req);
    const courseModuleId = req.params.courseModuleId;
    const courseModule = await courseModuleService.getByPk(courseModuleId, {
      model: Course,
    });
    if (errors.isEmpty()) {
      const { content, pathName } = req.body;
      await moduleDocumentService.create(content, pathName, courseModuleId);
      req.flash("success", messageSuccess.CREATE);
      res.redirect(`${redirectPath.TEACHER_DOCUMENT}${courseModule.Course.id}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());

      res.redirect(
        `${redirectPath.TEACHER_DOCUMENT_CREATE_SECTION}${courseModule.id}`
      );
    }
  },

  sectionUpdate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const moduleDocumentId = req.params.id;
    const moduleDocument = await moduleDocumentService.getByPk(
      moduleDocumentId,
      {
        model: CourseModule,
        include: {
          model: Course,
        },
      }
    );
    res.render(renderPath.TEACHER_DOCUMENT_UPDATE_SECTION, {
      user,
      redirectPath,
      msgErr,
      errors,
      validateUtil,
      moduleDocument,
    });
  },
  handleSectionUpdate: async (req, res) => {
    const errors = validationResult(req);
    const moduleDocumentId = req.params.id;
    if (errors.isEmpty()) {
      const { content, pathName } = req.body;
      await moduleDocumentService.updateById(
        { content: content, pathName: pathName },
        moduleDocumentId
      );
      const moduleDocument = await moduleDocumentService.getByPk(
        moduleDocumentId,
        {
          model: CourseModule,
          include: {
            model: Course,
          },
        }
      );
      console.log(90798);
      console.log(moduleDocument);
      req.flash("success", messageSuccess.UPDATE);
      res.redirect(
        `${redirectPath.TEACHER_DOCUMENT}${moduleDocument.CourseModule.Course.id}`
      );
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(
        `${redirectPath.TEACHER_DOCUMENT_UPDATE_SECTION}${moduleDocumentId}`
      );
    }
  },
  sectionDelete: async (req, res) => {
    const moduleDocumentId = req.params.id;
    const moduleDocument = await moduleDocumentService.getByPk(
      moduleDocumentId,
      {
        model: CourseModule,
        include: {
          model: Course,
        },
      }
    );
    await moduleDocumentService.deleteById(moduleDocumentId);
    req.flash("success", messageSuccess.DELETE);
    res.redirect(
      `${redirectPath.TEACHER_DOCUMENT}${moduleDocument.CourseModule.Course.id}`
    );
  },

  studentList: async (req, res) => {
    const user = req.user;
    const userId = user.id;
    const { keyword } = req.query;
    const filters = keyword
      ? {
          where: {
            id: userId,
            [Op.or]: [
              {
                "$Classes.StudentsClasses.User.name$": {
                  [Op.like]: `%${keyword}%`,
                },
              },
            ],
          },
        }
      : { where: { id: userId } };
    const teacher = await userService.getUser(filters.where, {
      model: Class,
      include: {
        model: StudentsClasses,
        include: [
          {
            model: Class,
            include: {
              model: Course,
            },
          },
          {
            model: User,
          },
          {
            model: LearningStatus,
          },
        ],
      },
    });
    // const teacher = await userService.getUserById(userId, {
    //   model: Class,
    //   include: {
    //     model: StudentsClasses,
    //     include: [
    //       {
    //         model: Class,
    //         include: {
    //           model: Course,
    //         },
    //       },
    //       {
    //         model: User,
    //       },
    //       {
    //         model: LearningStatus,
    //       },
    //     ],
    //   },
    // });
    console.log(1);
    console.log(teacher.Classes);
    const students = {};
    teacher.Classes.forEach((classItem) => {
      classItem.StudentsClasses.forEach((stdcls) => {
        if (students.hasOwnProperty(stdcls.User.name)) {
          students[stdcls.User.name].push(stdcls);
        } else {
          students[stdcls.User.name] = [stdcls];
        }
      });
    });
    console.log(students);
    const msgSuccess = req.flash("success");
    res.render(renderPath.TEACHER_STUDENT_LIST, {
      user,
      redirectPath,
      req,
      students,
      msgSuccess,
      moment,
    });
  },
  updateLearningStatus: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("error");
    const stdClsId = req.params.id;
    const stdCls = await studentsClassesService.getById(stdClsId, [
      {
        model: Class,
      },
      {
        model: User,
      },
    ]);
    const learningStatus = await learningStatusService.getAll();

    res.render(renderPath.TEACHER_LEARNING_STATUS_UPDATE, {
      user,
      redirectPath,
      msgErr,
      req,
      learningStatus,
      stdCls,
      moment,
    });
  },
  handleUpdateLearningStatus: async (req, res) => {
    const stdClsId = req.params.id;
    const user = req.user;
    const { statusId, reasonStatus, dateStatus } = req.body;
    if (statusId == 1 || statusId == 2) {
      await studentsClassesService.updateById(
        {
          statusId: statusId,
          reasonStatus: null,
          dateStatus: null,
        },
        stdClsId
      );
    } else {
      await studentsClassesService.updateById(
        {
          statusId: statusId,
          reasonStatus: reasonStatus,
          dateStatus: dateStatus,
        },
        stdClsId
      );
    }
    req.flash("success", messageSuccess.UPDATE);
    res.redirect(redirectPath.TEACHER_STUDENT_LIST);
  },

  homeWork: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const classId = req.params.id;
    const classItem = await classesService.getClassById(classId);
    const exercises = await exerciseService.getByClassId(classId);
    res.render(renderPath.TEACHER_CLASS_HOMEWORK, {
      user,
      redirectPath,
      msgErr,
      msgSuccess,
      messageInfo,
      exercises,
      classItem,
    });
  },
  addHomeWork: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const classId = req.params.id;
    const classItem = await classesService.getClassById(classId);
    res.render(renderPath.TEACHER_CLASS_ADD_HOMEWORK, {
      user,
      redirectPath,
      msgErr,
      classItem,
      validateUtil,
      errors,
    });
  },
  hanldeAddHomeWork: async (req, res) => {
    const errors = validationResult(req);
    const classId = req.params.id;
    if (errors.isEmpty()) {
      const { title, attachment, content } = req.body;
      await exerciseService.create(classId, title, content, attachment);
      req.flash("success", messageSuccess.CREATE);
      res.redirect(`${redirectPath.TEACHER_CLASS_HOMEWORK}${classId}`);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.TEACHER_CLASS_ADD_HOMEWORK}${classId}`);
    }
  },
  editHomework: async (req, res) => {
    const user = req.user;
    const errors = req.flash("errors");
    const msgErr = req.flash("msgErr");
    const exerciseId = req.params.id;
    const exercise = await exerciseService.getExerciseById(exerciseId, {
      model: Class,
    });
    res.render(renderPath.TEACHER_CLASS_EDIT_HOMEWORK, {
      user,
      redirectPath,
      msgErr,
      validateUtil,
      errors,
      exercise,
    });
  },
  handleEditHomework: async (req, res) => {
    const errors = validationResult(req);
    const exerciseId = req.params.id;

    if (errors.isEmpty()) {
      const { title, attachment, content } = req.body;
      const exercise = await exerciseService.getExerciseById(exerciseId);
      await exerciseService.update(exercise.id, title, content, attachment);
      req.flash("success", messageSuccess.CREATE);
      res.redirect(`${redirectPath.TEACHER_CLASS_HOMEWORK}${exercise.classId}`);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.TEACHER_CLASS_EDIT_HOMEWORK}${exerciseId}`);
    }
  },
  deleteHomework: async (req, res) => {
    const exerciseId = req.params.id;
    const exercise = await exerciseService.getExerciseById(exerciseId);
    await exerciseService.destroy(exerciseId);
    req.flash("success", messageSuccess.DELETE);
    res.redirect(`${redirectPath.TEACHER_CLASS_HOMEWORK}${exercise.classId}`);
  },
  homeworkDetail: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const exerciseId = req.params.id;

    const exercise = await exerciseService.getExerciseById(exerciseId, {
      model: ExercisesSubmit,
      include: {
        model: User,
      },
    });
    const classItem = await classesService.getClassById(exercise.classId);
    res.render(renderPath.TEACHER_CLASS_DETAIL_HOMEWORK, {
      user,
      redirectPath,
      msgErr,
      msgSuccess,
      exercise,
      classItem,
      moment,
      messageInfo,
    });
  },
  addExerciseSubmit: async (req, res) => {
    const exerciseId = req.params.id;
    const userId = req.user.id;
    const { content1 } = req.body;
    await exerciseSubmitService.create(userId, exerciseId, content1);
    req.flash("success", messageSuccess.CREATE);
    res.redirect(`${redirectPath.TEACHER_CLASS_DETAIL_HOMEWORK}${exerciseId}`);
  },
  replyHomeworkDetail: async (req, res) => {
    const exerciseSubmitId = req.params.id;
    const userId = req.user.id;
    const { content2 } = req.body;
    console.log(5563);
    const exerciseSubmit = await exerciseSubmitService.getById(
      exerciseSubmitId,
      { model: Exercises }
    );
    console.log(23434);
    console.log(exerciseSubmit);
    await exerciseSubmitService.create(
      userId,
      exerciseSubmit.Exercise.id,
      content2,
      exerciseSubmitId
    );
    req.flash("success", messageSuccess.CREATE);
    res.redirect(
      `${redirectPath.TEACHER_CLASS_DETAIL_HOMEWORK}${exerciseSubmit.Exercise.id}`
    );
  },
};
