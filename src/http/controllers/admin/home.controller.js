const { Op, where } = require("sequelize");
const {
  UserSocial,
  User,
  Type,
  LoginToken,
  Course,

  Class,
  TeacherCalendar,
  StudentsClasses,
  CourseModule,
  ModuleDocument,
  ExercisesSubmit,
  Exercises,
  Role,
  Permission,
} = require("../../../models/index");
const {
  messageError,
  messageSuccess,
  messageInfo,
} = require("../../../constants/constants.message");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
const hashUtil = require("../../../utils/hash.util");
const { validationResult, body } = require("express-validator");
const validateUtil = require("../../../utils/validate.util");
const sendMailUtil = require("../../../utils/sendMail.util");
const adminUtil = require("../../../utils/admin.util");
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/url.util");
const redirectUtil = require("../../../utils/redirect.util");
const permissionUtil = require("../../../utils/permission.utils");
const fs = require("fs");
var excel = require("excel4node");
const usersServices = require("../../services/users.services");
const coursesService = require("../../services/courses.services");
const classesService = require("../../services/classes.services");
const studentsClassesService = require("../../services/studentsClasses.services");
const courseModuleService = require("../../services/courseModule.services");
const moduleDocumentService = require("../../services/moduleDocument.services");
const studentAttendanceService = require("../../services/studentAttendance.service");
const exerciseService = require("../../services/exercises.service");
const exerciseSubmitService = require("../../services/exerciseSubmit.service");
const moment = require("moment");
module.exports = {
  index: async (req, res) => {
    const user = req.user;
    const users = await User.findAndCountAll();
    const courses = await Course.findAndCountAll();
    const classes = await Class.findAndCountAll();
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    console.log(users.count);
    console.log(users);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    const permissionUser = await permissionUtil.roleUser(req);
    // console.log(msgSuccess);
    return res.render(renderPath.HOME_ADMIN, {
      permissionUser,
      permissionUtil,
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
      users,
      courses,
      classes,
    });
  },
  userAdminList: async (req, res) => {
    const user = req.user;
    const { keyword } = req.query;

    const person = "Admin";
    const type = await Type.findOne({
      where: {
        name: person,
      },
    });

    const filters = {
      where: {
        typeId: type.id,
        email: {
          [Op.not]: user.email,
        },
      },
    };
    if (keyword) {
      filters.where[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }
    //  paginate
    const CountUser = await User.findAndCountAll({
      where: filters.where,
    });
    console.log(CountUser.count);
    const perPage = +process.env.PER_PAGE;
    const totalCount = CountUser.count;
    const totalPages = Math.ceil(totalCount / perPage);
    let { page } = req.query;
    if (page < 1 || page > totalPages || !page) {
      page = 1;
    }
    let offset = (page - 1) * perPage;
    const userList = await User.findAll({
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });

    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.USER_LIST, {
      permissionUser,
      permissionUtil,
      type,
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      userList,
      offset,
      messageInfo,
      totalPages,
      page,
      getPaginateUrl,
      req,
    });
  },
  userTeacherList: async (req, res) => {
    const user = req.user;
    const { status, keyword } = req.query;

    const person = "Giảng viên";
    const type = await Type.findOne({
      where: {
        name: person,
      },
    });
    const filters = {
      where: {
        typeId: type.id,
        email: {
          [Op.not]: user.email,
        },
      },
    };

    if (status === "active" || status === "inactive") {
      filters.where.firstLogin = status === "active" ? 1 : 0;
    }
    if (keyword) {
      filters.where[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

    //  paginate
    const CountUser = await User.findAndCountAll({
      where: filters.where,
    });
    const perPage = +process.env.PER_PAGE;
    const totalCount = CountUser.count;
    const totalPages = Math.ceil(totalCount / perPage);
    let { page } = req.query;
    if (page < 1 || page > totalPages || !page) {
      page = 1;
    }
    let offset = (page - 1) * perPage;

    const userList = await User.findAll({
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });

    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.TEACHER_LIST, {
      type,
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      userList,
      offset,
      messageInfo,
      totalPages,
      page,
      getPaginateUrl,
      req,
      permissionUser,
      permissionUtil,
    });
  },
  userTeacherCalendarAll: async (req, res) => {
    const user = req.user;
    const teacherCalendars = await classesService.getTeacherCalendarAll(
      User,
      Class
    );
    const calendarArray = [];
    teacherCalendars.forEach((calendar) => {
      calendarArray.push({
        title: `${calendar.User.name}(${calendar.Class.name})`,
        start: calendar.scheduleStartDate,
      });
    });

    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.TEACHER_LIST_CALENDAR, {
      permissionUser,
      permissionUtil,
      user,
      redirectPath,
      calendarArray,
    });
  },

  userTeacherCalendar: async (req, res) => {
    const user = req.user;
    const teacherId = req.params.id;
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.TEACHER_LIST_CALENDAR, {
      permissionUser,
      permissionUtil,
      user,
      redirectPath,
      calendarArray,
    });
  },

  userStudentList: async (req, res) => {
    const user = req.user;
    const { status, keyword } = req.query;
    const person = "Học viên";
    const type = await Type.findOne({
      where: {
        name: person,
      },
    });
    const filters = {
      where: {
        typeId: type.id,
        email: {
          [Op.not]: user.email,
        },
      },
    };

    if (status === "active" || status === "inactive") {
      filters.where.firstLogin = status === "active" ? 1 : 0;
    }
    if (keyword) {
      filters.where[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }

    //  paginate
    const CountUser = await User.findAndCountAll({
      where: filters.where,
    });
    const perPage = +process.env.PER_PAGE;
    const totalCount = CountUser.count;
    const totalPages = Math.ceil(totalCount / perPage);
    let { page } = req.query;
    if (page < 1 || page > totalPages || !page) {
      page = 1;
    }
    let offset = (page - 1) * perPage;

    const userList = await User.findAll({
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
      include: {
        model: StudentsClasses,
      },
    });
    console.log(4684864);
    // const classIds = [];
    // userList.StudentsClasses.forEach((studentclass) => {
    //   classIds.push(studentclass.classId);
    // });
    let classes = [];
    for (const user of userList) {
      for (let studentClass of user.StudentsClasses) {
        let classItem = await Class.findOne({
          where: { id: studentClass.classId },
          include: {
            model: Course,
          },
        });
        console.log(classItem.name);
        classes.push({
          id: studentClass.studentId,
          class: classItem.name,
          course: classItem.Course.name,
        });
        // classes.push(111);
      }
    }
    console.log(classes);

    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.STUDENT_LIST, {
      permissionUser,
      permissionUtil,
      type,
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      userList,
      offset,
      messageInfo,
      totalPages,
      page,
      getPaginateUrl,
      req,
      classes,
    });
  },
  exportUsersExcel: async (req, res) => {
    const { keyword, typeId } = req.query;

    const filters = {
      where: {
        typeId: typeId,
      },
    };

    if (keyword) {
      filters.where[Op.or] = [
        {
          name: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${keyword}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ];
    }
    console.log();

    const users = await usersServices.getUsersByCondition(filters.where);
    console.log(4984984984);
    console.log(users);

    const wb = new excel.Workbook();
    const ws = wb.addWorksheet("Sheet 1");
    const style = wb.createStyle({
      font: {
        size: 14,
      },
      with: 500,
    });

    ws.cell(1, 1).string("STT").style(style);
    ws.cell(1, 2).string("Tên").style(style);
    ws.cell(1, 3).string("Email").style(style);
    ws.cell(1, 4).string("Số điện thoại").style(style);
    ws.cell(1, 5).string("Địa chỉ").style(style);
    let row = 2;
    users.forEach((user) => {
      let i = 1;
      ws.cell(row, i).string(`${row - 1}`);
      i++;
      ws.cell(row, i).string(user.name);
      i++;
      ws.cell(row, i).string(user.email);
      i++;
      ws.cell(row, i).string(user.phone);
      i++;
      ws.cell(row, i).string(user.address);
      row++;
    });

    const filePath = "UsersFile.xlsx";

    wb.write(filePath, (err, stats) => {
      if (err) {
        console.error("Lỗi khi ghi file Excel:", err);
        req.flash("error", "Lỗi khi ghi file Excel");
        res.redirect(redirectPath.HOME_ADMIN);
      } else {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=UsersFile.xlsx"
        );
        const fileContent = fs.readFileSync(filePath);
        res.send(fileContent);
      }
    });
  },
  userCreate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const msgSuccess = req.flash("success");
    const types = await Type.findAll();
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.USER_CREATE, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      errors,
      validateUtil,
      types,
      messageInfo,
    });
  },
  handleUserCreate: async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      const { name, email, phone, address, typeId } = req.body;
      let password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      });
      console.log(password);
      const subject = messageInfo.SUBJECT_CREATE_USER;
      const text = `Mật khẩu tạm thời của bạn là ${password} . Vui lòng đăng nhập và đổi lại mật khẩu để kích hoạt tài khoản của bạn`;
      const html = `<b>${text}</b>`;
      sendMailUtil(email, subject, text, html);
      password = hashUtil.make(password);
      await User.create({ name, email, phone, address, typeId, password });
      req.flash("success", messageSuccess.CREATE_USER);
      return res.redirect(redirectPath.USER_CREATE);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(redirectPath.USER_CREATE);
    }
  },
  userUpdate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const msgSuccess = req.flash("success");
    const types = await Type.findAll();
    const idUpdate = req.params.id;
    const userUpdate = await User.findByPk(idUpdate);
    console.log(userUpdate);
    const redirectCancel = redirectUtil.redirectUserList(userUpdate.typeId);
    console.log(redirectCancel);
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.USER_UPDATE, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      redirectCancel,
      types,
      errors,
      validateUtil,
      userUpdate,
    });
  },
  handleUserUpdate: async (req, res) => {
    const idUpdate = req.params.id;
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      await User.update(req.body, { where: { id: idUpdate } });
      req.flash("success", messageSuccess.UPDATE_USER);
      const userUpdate = await User.findByPk(idUpdate);
      const redirectCancel = redirectUtil.redirectUserList(userUpdate.typeId);
      return res.redirect(redirectCancel);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(`${redirectPath.USER_UPDATE}${idUpdate}`);
    }
  },
  userDelete: async (req, res) => {
    const user = req.user;
    const idDelete = req.params.id;
    const userDelete = await User.findByPk(idDelete);
    const typeIdDelete = userDelete.typeId;
    if (userDelete.email === user.email) {
      res.json({
        message: "Không tự xóa được chính mình",
      });
    }
    // await LoginToken.destroy({ where: { userId: idDelete } });
    await User.destroy({ where: { id: idDelete }, cascade: true });
    req.flash("success", messageSuccess.DELETE_USER);
    const redirectDelete = redirectUtil.redirectUserList(typeIdDelete);
    res.redirect(redirectDelete);
  },

  // Course
  courseList: async (req, res) => {
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
          {
            "$User.name$": {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      };
    }
    console.log(filters.where);

    //  paginate
    const countCourse = await Course.findAndCountAll({
      include: {
        model: User,
      },
      where: filters.where,
    });
    const perPage = +process.env.PER_PAGE;
    const totalCount = countCourse.count;
    const totalPages = Math.ceil(totalCount / perPage);
    let { page } = req.query;
    if (page < 1 || page > totalPages || !page) {
      page = 1;
    }
    let offset = (page - 1) * perPage;

    const courseList = await Course.findAll({
      include: {
        model: User,
      },
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });
    const permissionUser = await permissionUtil.roleUser(req);

    res.render(renderPath.COURSE_LIST, {
      permissionUser,
      permissionUtil,
      user,
      req,
      msgErr,
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
    const msgSuccess = req.flash("success");
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_COURSE_DOCUMENT, {
      permissionUser,
      permissionUtil,
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_DOCUMENT_CREATE_CHAPTER, {
      permissionUser,
      permissionUtil,
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
      res.redirect(`${redirectPath.ADMIN_DOCUMENT}${courseId}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(`${redirectPath.ADMIN_DOCUMENT_CREATE_CHAPTER}${courseId}`);
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_DOCUMENT_UPDATE_CHAPTER, {
      permissionUser,
      permissionUtil,
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
      res.redirect(`${redirectPath.ADMIN_DOCUMENT}${courseModule.Course.id}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(
        `${redirectPath.ADMIN_DOCUMENT_UPDATE_CHAPTER}${courseModuleId}`
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
    res.redirect(`${redirectPath.ADMIN_DOCUMENT}${courseModule.Course.id}`);
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_DOCUMENT_CREATE_SECTION, {
      permissionUser,
      permissionUtil,
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
      res.redirect(`${redirectPath.ADMIN_DOCUMENT}${courseModule.Course.id}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());

      res.redirect(
        `${redirectPath.ADMIN_DOCUMENT_CREATE_SECTION}${courseModule.id}`
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_DOCUMENT_UPDATE_SECTION, {
      permissionUser,
      permissionUtil,
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
        `${redirectPath.ADMIN_DOCUMENT}${moduleDocument.CourseModule.Course.id}`
      );
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(
        `${redirectPath.ADMIN_DOCUMENT_UPDATE_SECTION}${moduleDocumentId}`
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
      `${redirectPath.ADMIN_DOCUMENT}${moduleDocument.CourseModule.Course.id}`
    );
  },

  exportCoursesExcel: async (req, res) => {
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
          {
            "$User.name$": {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      };
    }
    const courses = await coursesService.getCoursesByCondition(filters.where);

    const wb = new excel.Workbook();
    const ws = wb.addWorksheet("Sheet 1");
    const style = wb.createStyle({
      font: {
        size: 14,
      },
      with: 500,
    });

    ws.cell(1, 1).string("STT").style(style);
    ws.cell(1, 2).string("Tên Khóa Học").style(style);
    ws.cell(1, 3).string("Giá").style(style);
    ws.cell(1, 4).string("Giáo viên").style(style);
    ws.cell(1, 5).string("Học thử").style(style);
    ws.cell(1, 6).string("Số lượng học viên").style(style);
    ws.cell(1, 7).string("Thời lượng học").style(style);
    let row = 2;
    courses.forEach((course) => {
      let i = 1;
      ws.cell(row, i).string(`${row - 1}`);
      i++;
      ws.cell(row, i).string(course.name);
      i++;
      ws.cell(row, i).number(course.price);
      i++;
      ws.cell(row, i).string(course.User.name);
      i++;
      ws.cell(row, i).number(course.tryLearn);
      i++;
      ws.cell(row, i).number(course.quantity);
      i++;
      ws.cell(row, i).number(course.duration);
      row++;
    });

    const filePath = "CoursesFile.xlsx";

    wb.write(filePath, (err, stats) => {
      if (err) {
        console.error("Lỗi khi ghi file Excel:", err);
        req.flash("error", "Lỗi khi ghi file Excel");
        res.redirect(redirectPath.HOME_ADMIN);
      } else {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=CoursesFile.xlsx"
        );
        const fileContent = fs.readFileSync(filePath);
        res.send(fileContent);
      }
    });
  },
  courseCreate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const errors = req.flash("errors");
    const teachers = await User.findAll({ where: { typeId: 2 } });
    const permissionUser = await permissionUtil.roleUser(req);

    res.render(renderPath.COURSE_CREATE, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      errors,
      validateUtil,
      redirectPath,
      teachers,
    });
  },
  handleCourseCreate: async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Course.create(req.body);
      req.flash("success", messageSuccess.CREATE_COURSE);
      res.redirect(redirectPath.COURSE_CREATE);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(redirectPath.COURSE_CREATE);
    }
  },
  courseUpdate: async (req, res) => {
    const idUpdate = req.params.id;
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const errors = req.flash("errors");
    const teachers = await User.findAll({ where: { typeId: 2 } });
    const courseUpdate = await Course.findByPk(idUpdate);
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.COURSE_UPDATE, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      errors,
      validateUtil,
      redirectPath,
      teachers,
      courseUpdate,
    });
  },
  handleCourseUpdate: async (req, res) => {
    const idUpdate = req.params.id;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Course.update(req.body, {
        where: {
          id: idUpdate,
        },
      });
      req.flash("success", messageSuccess.UPDATE_SUCCESS);
      res.redirect(redirectPath.COURSE_LIST);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.COURSE_UPDATE}${idUpdate}`);
    }
  },
  courseDelete: (req, res) => {
    const idDelete = req.params.id;
    Course.destroy({ where: { id: idDelete } });
    req.flash("success", messageSuccess.DELETE);
    res.redirect(redirectPath.COURSE_LIST);
  },

  // Class
  classCreate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const errors = req.flash("errors");
    const courses = await Course.findAll();

    console.log(courses);
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.CLASS_CREATE, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      errors,
      redirectPath,
      validateUtil,
      courses,
    });
  },
  handleClassCreate: async (req, res) => {
    let { courseId, name, startDate, schedule, timeLearn } = req.body;

    console.log(req.body);
    console.log(startDate);
    const errors = validationResult(req);
    // console.log(errors);
    if (errors.isEmpty()) {
      const course = await Course.findByPk(courseId);
      const dateCount = Math.ceil((course.quantity / schedule.length) * 7);
      const endDate = moment(startDate).add(dateCount, "days").calendar();

      let classItem = await classesService.createClass(
        name,
        0,
        startDate,
        endDate,
        schedule.toString(),
        timeLearn.toString(),
        courseId
      );
      const userItem = await User.findByPk(course.teacherId);
      await classItem.addUser(userItem);
      classItem = await classesService.getClassById(classItem.id, {
        model: Course,
      });
      const selectedDays = adminUtil.getArrayTimeLearn(
        schedule,
        startDate,
        endDate,
        timeLearn
      );
      // console.log(6540658);
      // console.log(selectedDays);
      for (let i = 0; i < selectedDays.length; i += 2) {
        await classesService.createTeacherCalendar(
          classItem.Course.teacherId,
          classItem.id,
          selectedDays[i],
          selectedDays[i + 1]
        );
      }
      req.flash("success", messageSuccess.CREATE_CLASS);
      res.redirect(redirectPath.CLASS_CREATE);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(redirectPath.CLASS_CREATE);
    }
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
      filters.where
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
          model: User,
        },
        {
          model: Course,
        },
      ],
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });
    // console.log(classList[0].Users[0].name);
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.CLASS_LIST, {
      permissionUser,
      permissionUtil,
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
  classUpdate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const errors = req.flash("errors");
    const idUpdate = req.params.id;
    const classItem = await classesService.getClassById(idUpdate);
    // console.log(classItem);
    const courses = await coursesService.getCourses();
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.CLASS_UPDATE, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      errors,
      redirectPath,
      classItem,
      courses,
      validateUtil,
      moment,
    });
  },
  handleClassUpdate: async (req, res) => {
    const classId = req.params.id;
    let { courseId, name, startDate, schedule, timeLearn } = req.body;
    console.log(45454);
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      const course = await Course.findByPk(courseId);
      const dateCount = Math.ceil((course.quantity / schedule.length) * 7);
      const endDate = moment(startDate).add(dateCount, "days").calendar();
      let classItem = await classesService.updateClass(
        {
          name: name,
          startDate: startDate,
          endDate: endDate,
          schedule: schedule.toString(),
          timeLearn: timeLearn.toString(),
          courseId: courseId,
        },
        {
          where: {
            id: classId,
          },
        }
      );

      req.flash("success", messageSuccess.UPDATE_CLASS);
      res.redirect(redirectPath.CLASS_LIST);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.CLASS_UPDATE}${classId}`);
    }
  },
  classDelete: async (req, res) => {
    const idDelete = req.params.id;

    classesService.destroyCLassById(idDelete);

    req.flash("success", messageSuccess.DELETE);
    res.redirect(redirectPath.CLASS_LIST);
  },
  classAddStudent: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const errors = req.flash("errors");
    const idAddStudent = req.params.id;
    const classItem = await classesService.getClassById(idAddStudent, {
      model: StudentsClasses,
    });

    const { keyword } = req.query;
    let filters = {
      where: {
        typeId: 1,
      },
    };
    if (keyword) {
      filters.where = {
        name: {
          [Op.like]: `%${keyword}%`,
        },
      };
    }
    const users = await usersServices.getUsersByCondition(filters.where);
    // console.log(6546485);
    const studentIds = [];
    classItem.StudentsClasses.forEach((studentClass) => {
      // console.log(studentClass.studentId);
      studentIds.push(studentClass.studentId);
    });
    // console.log(studentIds);

    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.CLASS_ADD_STUDENT, {
      permissionUser,
      permissionUtil,
      user,
      msgErr,
      msgSuccess,
      errors,
      redirectPath,
      req,
      validateUtil,
      classItem,
      users,
      studentIds,
    });
  },
  hanldeClassAddStudent: async (req, res) => {
    const classId = req.params.id;
    const { value } = req.body;
    const learningStatus = 1;
    // console.log(classId);
    await studentsClassesService.deleteStudentsClassesByClassId(classId);
    for (let i = 0; i < value.length; i++) {
      await studentsClassesService.createStudentsClasses(
        value[i],
        classId,
        learningStatus,
        null,
        null,
        null
      );
    }
    await classesService.updateClassByCondition(
      { quantity: value.length },
      {
        where: {
          id: classId,
        },
      }
    );
    req.flash("success", messageSuccess.CREATE);
    res.redirect(redirectPath.CLASS_LIST);
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_CLASS_ATTENDANCE, {
      permissionUser,
      permissionUtil,
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
    res.redirect(`${redirectPath.ADMIN_CLASS_ATTENDANCE}${classId}`);
  },
  homeWork: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("success");
    const classId = req.params.id;
    const classItem = await classesService.getClassById(classId);
    const exercises = await exerciseService.getByClassId(classId);
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_CLASS_HOMEWORK, {
      permissionUser,
      permissionUtil,
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_CLASS_ADD_HOMEWORK, {
      permissionUser,
      permissionUtil,
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
      res.redirect(`${redirectPath.ADMIN_CLASS_HOMEWORK}${classId}`);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.ADMIN_CLASS_ADD_HOMEWORK}${classId}`);
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_CLASS_EDIT_HOMEWORK, {
      permissionUser,
      permissionUtil,
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
      res.redirect(`${redirectPath.ADMIN_CLASS_HOMEWORK}${exercise.classId}`);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.ADMIN_CLASS_EDIT_HOMEWORK}${exerciseId}`);
    }
  },
  deleteHomework: async (req, res) => {
    const exerciseId = req.params.id;
    const exercise = await exerciseService.getExerciseById(exerciseId);
    await exerciseService.destroy(exerciseId);
    req.flash("success", messageSuccess.DELETE);
    res.redirect(`${redirectPath.ADMIN_CLASS_HOMEWORK}${exercise.classId}`);
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
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_CLASS_DETAIL_HOMEWORK, {
      permissionUser,
      permissionUtil,
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
    res.redirect(`${redirectPath.ADMIN_CLASS_DETAIL_HOMEWORK}${exerciseId}`);
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
      `${redirectPath.ADMIN_CLASS_DETAIL_HOMEWORK}${exerciseSubmit.Exercise.id}`
    );
  },
  deleteReplyHomeworkDetail: async (req, res) => {
    const exerciseSubmitId = req.params.id;
    const exerciseSubmit = await exerciseSubmitService.getById(
      exerciseSubmitId,
      { model: Exercises }
    );
    await exerciseSubmitService.destroy(exerciseSubmitId);

    req.flash("success", messageSuccess.DELETE);
    res.redirect(
      `${redirectPath.ADMIN_CLASS_DETAIL_HOMEWORK}${exerciseSubmit.Exercise.id}`
    );
  },
  addRole: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("msgSuccess");
    const errors = req.flash("errors");
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_ROLE_ADD, {
      permissionUser,
      permissionUtil,
      user,
      redirectPath,
      msgErr,
      msgSuccess,
      validateUtil,
      errors,
    });
  },
  handleAddRole: async (req, res) => {
    const { nameRole, permission } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const role = await Role.create({ name: nameRole });

      if (permission) {
        let dataPermission = [];
        if (typeof permission === "string") {
          dataPermission.push({
            value: permission,
          });
        } else {
          dataPermission = permission.map((item) => ({
            value: item,
          }));
        }

        await Promise.all(
          dataPermission.map(async (item) => {
            const permissionInstance = await Permission.findOne({
              where: item,
            });
            if (permissionInstance) {
              await role.addPermission(permissionInstance);
            } else {
              await role.createPermission(item);
            }
          })
        );
      }
      req.flash("msgSuccess", messageSuccess.CREATE);
      res.redirect(`${redirectPath.ADMIN_ROLE_ADD}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(`${redirectPath.ADMIN_ROLE_ADD}`);
    }
  },
  indexRoles: async (req, res) => {
    const user = req.user;
    const msgSuccess = req.flash("msgSuccess");
    const roles = await Role.findAll();
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_ROLE_INDEX, {
      permissionUser,
      permissionUtil,
      user,
      msgSuccess,
      redirectPath,
      roles,
    });
  },
  editRole: async (req, res) => {
    const user = req.user;
    const errors = req.flash("errors");
    const msgErr = req.flash("msgErr");
    const roleId = req.params.id;
    const role = await Role.findOne({
      where: {
        id: roleId,
      },
      include: {
        model: Permission,
      },
    });
    const { Permissions: permissions } = role;
    console.log(permissions);
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_ROLE_EDIT, {
      permissionUser,
      permissionUtil,
      user,
      redirectPath,
      msgErr,
      validateUtil,
      errors,
      role,
      permissionUtil,
      permissions,
    });
  },
  handleEditRole: async (req, res) => {
    const roleId = req.params.id;
    const { nameRole, permission } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await Role.update(
        {
          name: nameRole,
        },
        {
          where: {
            id: roleId,
          },
        }
      );
      const role = await Role.findOne({
        where: {
          id: roleId,
        },
      });

      if (permission) {
        let dataPermission = [];
        if (typeof permission === "string") {
          dataPermission.push({
            value: permission,
          });
        } else {
          dataPermission = permission.map((item) => ({
            value: item,
          }));
        }

        const permissionUpdate = await Promise.all(
          dataPermission.map(async (item) => {
            let permissionInstance = await Permission.findOne({
              where: item,
            });

            if (!permissionInstance) {
              permissionInstance = await role.createPermission(item);
            }

            return permissionInstance;
          })
        );
        console.log(permissionUpdate);
        await role.setPermissions(permissionUpdate);
      }
      req.flash("msgSuccess", messageSuccess.UPDATE);
      res.redirect(`${redirectPath.ADMIN_ROLE_INDEX}`);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(`${redirectPath.ADMIN_ROLE_EDIT}${roleId}`);
    }
  },
  deleteRole: async (req, res) => {
    const roleId = req.params.id;
    // Lấy role cần xóa
    const role = await Role.findOne({
      where: {
        id: roleId,
      },
    });

    const permissions = await Permission.findAll();

    // Xóa tất cả Permission liên quan đến Role cần xóa
    role.removePermissions(permissions);

    await Role.destroy({
      where: {
        id: roleId,
      },
    });
    req.flash("msgSuccess", messageSuccess.DELETE);
    res.redirect(`${redirectPath.ADMIN_ROLE_INDEX}`);
  },
  permission: async (req, res) => {
    const user = req.user;
    const idUpdate = req.params.id;

    const userUpdate = await User.findOne({
      where: {
        id: idUpdate,
      },
    });

    const roles = await Role.findAll();
    const roleUser = await Role.findAll({
      include: {
        model: User,
        where: {
          id: idUpdate,
        },
      },
    });
    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.ADMIN_PERMISSION, {
      permissionUser,
      permissionUtil,
      user,
      userUpdate,
      redirectPath,
      roles,
      roleUser,
      permissionUtil,
    });
  },
  handlePermission: async (req, res) => {
    const idUpdate = req.params.id;
    let { roles } = req.body;
    const userUpdate = await User.findOne({
      where: {
        id: idUpdate,
      },
    });

    if (roles) {
      if (typeof roles === "string") {
        roles = [roles];
      }

      const rolesUpdate = await Promise.all(
        roles.map((roleId) =>
          Role.findOne({
            where: {
              id: roleId,
            },
          })
        )
      );

      await userUpdate.setRoles(rolesUpdate);
    }
    req.flash("success", messageSuccess.CREATE);
    return res.redirect(redirectPath.USER_LIST_ADMIN);
  },
};
