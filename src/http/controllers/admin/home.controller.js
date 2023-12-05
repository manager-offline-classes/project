const { UserSocial, User } = require("../../../models/index");
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
    return res.render("admin/index", { user, socials, msgErr, msgSuccess });
  },
  setting: async (req, res) => {
    const user = req.user;
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    return res.render("admin/settings/setting", {
      user,
      socials,
      msgErr,
      msgSuccess,
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
    return res.render("admin/settings/editInfo", {
      user,
      socials,
      msgErr,
      msgSuccess,
    });
  },
  handleEditInfo: async (req, res) => {
    const { name, email, address, phone } = req.body;
    console.log(55555555555);
    const id = req.user.id;
    await User.update({ name, email, address, phone }, { where: { id } });
    req.flash("success", "Cập nhật dữ liệu thành công");
    res.redirect("/admin/setting");
  },
};
