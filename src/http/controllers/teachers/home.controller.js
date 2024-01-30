const {
  UserSocial,
  User,
  Class,
  Course,
  StudentsClasses,
} = require("../../../models/index");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
const classesService = require("../../services/classes.services");
const moment = require("moment");

const { getPaginateUrl } = require("../../../utils/url.util");
const { Op } = require("sequelize");
const StudentsClassesService = require("../../services/studentsClasses.services");
module.exports = {
  index: async (req, res) => {
    const user = req.user;

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
      await StudentsClassesService.getStudentsClassesByClassId(classId, {
        model: User,
        where: filters.where,
      });
    console.log(StudentsClasses[0].User.name);
    res.render(renderPath.VIEW_STUDENT_IN_CLASS, {
      user,
      redirectPath,
      StudentsClasses,
      req,
    });
  },
  studentList: async (req, res) => {
    const user = req.user;
    const studentsclasses =
      await StudentsClassesService.getStudentClassesByTeacherId(103);
    console.log(1);
    console.log(studentsclasses);
    console.log(studentsclasses.length);
    res.render(renderPath.TEACHER_STUDENT_LIST, {
      user,
      redirectPath,
      req,
    });
  },
};
