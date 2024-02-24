const {
  UserSocial,
  User,
  Course,
  Class,
  StudentsClasses,
  CourseModule,
  ModuleDocument,
  TeacherCalendar,
  ExercisesSubmit,
} = require("../../../models/index");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
const {
  messageError,
  messageSuccess,
  messageInfo,
} = require("../../../constants/constants.message");
const userService = require("../../services/users.services");
const classesService = require("../../services/classes.services");
const coursesService = require("../../services/courses.services");
const studentAttendanceService = require("../../services/studentAttendance.service");
const exerciseService = require("../../services/exercises.service");
const exerciseSubmitService = require("../../services/exerciseSubmit.service");
const moment = require("moment");
const { getPaginateUrl } = require("../../../utils/url.util");
const { Op } = require("sequelize");
module.exports = {
  index: async (req, res) => {
    const user = req.user;

    console.log(user.id);
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const userItem = await userService.getUser(
      { id: user.id },
      {
        model: StudentsClasses,
        include: {
          model: Class,
          // include: {
          //   model: Course,
          // },
        },
      }
    );
    // console.log(userItem.StudentsClasses.Class.name);
    // userItem.StudentsClasses.forEach((stdCls) => {
    //   console.log(stdCls.Class.name);
    // });
    const socials = userSocials.map((social) => social.dataValues.provider);
    console.log(54654654);
    console.log(socials);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    return res.render("students/home/index", {
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
      userItem,
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
          model: StudentsClasses,
          where: { studentId: user.id }, // Chỉ lấy lớp học liên quan đến người dùng có ID là userId
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
          model: StudentsClasses,
          where: { studentId: user.id }, // Chỉ lấy lớp học liên quan đến người dùng có ID là userId
        },
      ],
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });
    console.log(classList);
    res.render(renderPath.STUDENT_CLASS_LIST, {
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
    res.render(renderPath.STUDENT_CLASS_DOCUMENT, {
      user,
      redirectPath,
      msgSuccess,
      course,
      messageInfo,
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
          where: {
            id: user.id,
          },
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
    res.render(renderPath.STUDENT_CLASS_ATTENDANCE, {
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
  homeWork: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const classId = req.params.id;
    const classItem = await classesService.getClassById(classId);
    const exercises = await exerciseService.getByClassId(classId);
    res.render(renderPath.STUDENT_CLASS_HOMEWORK, {
      user,
      redirectPath,
      msgErr,
      msgSuccess,
      messageInfo,
      exercises,
      classItem,
    });
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
    res.render(renderPath.STUDENT_CLASS_DETAIL_HOMEWORK, {
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
    res.redirect(`${redirectPath.STUDENT_CLASS_DETAIL_HOMEWORK}${exerciseId}`);
  },
};
