const { Op } = require("sequelize");
const { UserSocial, User, Type, LoginToken } = require("../../../models/index");
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
const { validationResult } = require("express-validator");
const validateUtil = require("../../../utils/validate.util");
const sendMailUtil = require("../../../utils/sendMail.util");
const generator = require("generate-password");
const { getPaginateUrl } = require("../../../utils/url.util");
const redirectUtil = require("../../../utils/redirect.util");
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
    const { status, keyword } = req.query;

    const person = "Admin";
    const type = await Type.findOne({
      where: {
        name: person,
      },
    });

    const filters = {
      where: {
        typeId: type.id,
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
    const user = req.user;
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

    console.log(6666);
    const userList = await User.findAll({
      where: filters.where,
      order: [["createdAt"]],
      offset: offset,
      limit: perPage,
    });

    console.log(8888);

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

    const user = req.user;
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

    const user = req.user;
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
      return res.redirect(`${redirectPath.USER_UPDATE}${idUpdate}`);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(`${redirectPath.USER_UPDATE}${idUpdate}`);
    }
  },
  userDelete: async (req, res) => {
    console.log(79799779);
    const idDelete = req.params.id;
    const userDelete = await User.findByPk(idDelete);
    const typeIdDelete = userDelete.typeId;
    // await LoginToken.destroy({ where: { userId: idDelete } });
    await User.destroy({ where: { id: idDelete }, cascade: true });
    req.flash("msgSuccess", messageSuccess.DELETE_USER);
    const redirectDelete = redirectUtil.redirectUserList(typeIdDelete);
    res.redirect(redirectDelete);
  },
};
