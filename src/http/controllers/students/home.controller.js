const { UserSocial } = require("../../../models/index");
module.exports = {
  index: async (req, res) => {
    const user = req.user.user;
    console.log(user);
    console.log(user.id);
    const userSocials = await UserSocial.findAll({
      where: { userId: user.id },
    });
    console.log(userSocials);
    const socials = userSocials.map((social) => social.dataValues.provider);
    console.log(socials);
    return res.render("admin/index", { user, socials });
  },
};
