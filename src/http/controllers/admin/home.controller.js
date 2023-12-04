const { UserSocial } = require("../../../models/index");
module.exports = {
  index: async (req, res) => {
    const user = req.user.user;
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
  setting: (req, res) => {
    return res.render("admin/setting");
  },
};
