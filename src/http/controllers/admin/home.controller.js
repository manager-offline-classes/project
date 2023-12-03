const { UserSocial } = require("../../../models/index");
module.exports = {
  index: async (req, res) => {
    const user = req.user.user;
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    const socials = userSocials.map((social) => social.dataValues.provider);
    const msgErr = req.flash("error");
    const msgSuccess = req.flash("success");
    return res.render("admin/index", { user, socials, msgErr, msgSuccess });
  },
};
