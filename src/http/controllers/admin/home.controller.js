const { UserSocial, User } = require("../../../models/index");
const {
  messageError,
  messageSuccess,
} = require("../../../constants/constants.message");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
const hashUtil = require("../../../utils/hash.util");
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
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    return res.render(renderPath.SETTINGS_ADMIN_INFO, {
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
    });
  },
  handleEditInfo: async (req, res) => {
    const { name, email, address, phone } = req.body;
    const id = req.user.id;
    await User.update({ name, email, address, phone }, { where: { id } });
    req.flash("success", messageSuccess.UPDATE_SUCCESS);
    res.redirect(redirectPath.SETTINGS_ADMIN);
  },
  editPassword: async (req, res) => {
    const user = req.user;
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("msgSuccess");
    res.render(renderPath.SETTINGS_ADMIN_PASSWORD, {
      redirectPath,
      user,
      msgErr,
      msgSuccess,
    });
  },
  handleEditPassword: async (req, res) => {
    let { oldPassword, newPassword, rePassword } = req.body;
    console.log(222);
    const user = req.user;
    console.log(user.password);
    const check = hashUtil.check(oldPassword, user.password);
    if (!check) {
      console.log(888);
      req.flash("error", messageError.INVALID_PASSWORD);
      return res.redirect(redirectPath.SETTINGS_PASSWORD_ADMIN);
    } else if (newPassword !== rePassword) {
      req.flash("error", messageError.PASSWORD_SAME);
      return res.redirect(redirectPath.SETTINGS_PASSWORD_ADMIN);
    } else {
      newPassword = hashUtil.make(newPassword);
      await User.update({ password: newPassword }, { where: { id: user.id } });

      req.flash("msgSuccess", messageSuccess.CHANGE_PASSWORD);
      return res.redirect(redirectPath.SETTINGS_PASSWORD_ADMIN);
    }
  },
};
