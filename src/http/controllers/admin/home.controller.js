const { Op, where } = require("sequelize");
const {
  UserSocial,
  User,
  Type,
  LoginToken,
  Course,
  Class,
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
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/url.util");
const redirectUtil = require("../../../utils/redirect.util");
const fs = require("fs");
var excel = require("excel4node");
const usersServices = require("../../services/admin/users.services");
const coursesService = require("../../services/admin/courses.services");
module.exports = {
  index: async (req, res) => {
    const user = req.user;
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    console.log(socials);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    console.log(msgSuccess);
    return res.render(renderPath.HOME_ADMIN, {
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
    });
  },
  setting: async (req, res) => {
    const user = req.user;
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    return res.render(renderPath.SETTINGS_ADMIN, {
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
    });
  },
  editInfo: async (req, res) => {
    const user = req.user;
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    const msgErr = req.flash("msgErr");

    console.log(msgErr);
    const msgSuccess = req.flash("success");
    const errors = req.flash("errors");
    return res.render(renderPath.SETTINGS_ADMIN_INFO, {
      user,
      socials,
      errors,
      msgErr,
      msgSuccess,
      redirectPath,
      validateUtil,
    });
  },
  handleEditInfo: async (req, res) => {
    const { name, email, address, phone } = req.body;
    console.log(99999999);
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      const id = req.user.id;
      await User.update({ name, email, address, phone }, { where: { id } });
      req.flash("success", messageSuccess.UPDATE_SUCCESS);
      res.redirect(redirectPath.SETTINGS_ADMIN);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(redirectPath.SETTINGS_INFO_ADMIN);
    }
  },
  editPassword: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("msgSuccess");
    res.render(renderPath.SETTINGS_ADMIN_PASSWORD, {
      redirectPath,
      user,
      msgErr,
      msgSuccess,
    });
  },
  handleEditPassword: async (req, res) => {
    const user = req.user;
    const errors = validationResult(req);
    let { newPassword } = req.body;
    console.log(errors);
    if (errors.isEmpty()) {
      newPassword = hashUtil.make(newPassword);
      await User.update({ password: newPassword }, { where: { id: user.id } });

      req.flash("msgSuccess", messageSuccess.CHANGE_PASSWORD);
      return res.redirect(redirectPath.SETTINGS_PASSWORD_ADMIN);
    } else {
      req.flash("msgErr", errors.array()[0].msg);
      res.redirect(redirectPath.SETTINGS_PASSWORD_ADMIN);
    }
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
    res.render(renderPath.USER_LIST, {
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
    res.render(renderPath.USER_LIST, {
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
    });

    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    res.render(renderPath.USER_LIST, {
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
    res.render(renderPath.USER_CREATE, {
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
      const text = `Mật khẩu tạm thời của bạn là ${password}. Vui lòng đăng nhập và đổi lại mật khẩu để kích hoạt tài khoản của bạn`;
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
    res.render(renderPath.USER_UPDATE, {
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

    res.render(renderPath.COURSE_LIST, {
      user,
      req,
      msgErr,
      msgSuccess,
      courseList,
      redirectPath,
      getPaginateUrl,
      totalPages,
      page,
    });
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
      console.log(course);
      let i = 1;
      ws.cell(row, i).string(`${row - 1}`);
      i++;
      ws.cell(row, i).string(course.name);
      i++;
      ws.cell(row, i).number(course.price);
      console.log(course.price);
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

    res.render(renderPath.COURSE_CREATE, {
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
    res.render(renderPath.COURSE_UPDATE, {
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
          {
            "$User.name$": {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      };
    }
    const classes = await Class.findAll();
    res.render(renderPath.CLASS_LIST, {
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      classes,
    });
  },
};
