const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");

const {
  UserSocial,
  User,
  Type,
  LoginToken,
  Course,

  Class,
  TeacherCalendar,
  StudentsClasses,
} = require("../../../models/index");

const validateUtil = require("../../../utils/validate.util");
const permissionUtil = require("../../../utils/permission.utils");
const { validationResult, body } = require("express-validator");
const {
  messageError,
  messageSuccess,
  messageInfo,
} = require("../../../constants/constants.message");
const hashUtil = require("../../../utils/hash.util");
module.exports = {
  index: async (req, res) => {
    const user = req.user;
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");

    const permissionUser = await permissionUtil.roleUser(req);
    return res.render(renderPath.SETTINGS_ADMIN, {
      permissionUser,
      permissionUtil,
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

    const permissionUser = await permissionUtil.roleUser(req);
    return res.render(renderPath.SETTINGS_ADMIN_INFO, {
      permissionUser,
      permissionUtil,
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
      res.redirect(redirectPath.SETTINGS);
    } else {
      req.flash("errors", errors.array());
      req.flash("msgErr", messageError.ERROR_INFO);
      res.redirect(redirectPath.SETTINGS_INFO);
    }
  },
  editPassword: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("msgErr");
    const msgSuccess = req.flash("msgSuccess");

    const permissionUser = await permissionUtil.roleUser(req);
    res.render(renderPath.SETTINGS_ADMIN_PASSWORD, {
      permissionUser,
      permissionUtil,
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
      return res.redirect(redirectPath.SETTINGS_PASSWORD);
    } else {
      req.flash("msgErr", errors.array()[0].msg);
      res.redirect(redirectPath.SETTINGS_PASSWORD);
    }
  },
};
