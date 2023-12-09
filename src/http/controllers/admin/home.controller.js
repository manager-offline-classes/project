const { Op } = require("sequelize");
const { UserSocial, User, Type } = require("../../../models/index");
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
  userList: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    const userList = await User.findAll({
      where: {
        typeId: {
          [Op.not]: 3,
        },
      },
    });
    res.render(renderPath.USER_LIST_ADMIN, {
      user,
      msgErr,
      msgSuccess,
      redirectPath,
      userList,
      messageInfo,
    });
  },
  userCreate: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const errors = req.flash("errors");
    const msgSuccess = req.flash("success");
    const types = await Type.findAll({
      where: {
        name: {
          [Op.not]: "admin",
        },
      },
    });
    res.render(renderPath.USER_CREATE_ADMIN, {
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
      return res.redirect(redirectPath.USER_CREATE_ADMIN);
    } else {
      req.flash("msgErr", messageError.ERROR_INFO);
      req.flash("errors", errors.array());
      res.redirect(redirectPath.USER_CREATE_ADMIN);
    }
  },
};
