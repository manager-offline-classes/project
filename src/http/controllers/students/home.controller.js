const { UserSocial, User } = require("../../../models/index");
const {
  renderPath,
  redirectPath,
} = require("../../../constants/constants.path");
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
    return res.render("students/index", {
      user,
      socials,
      msgErr,
      msgSuccess,
      redirectPath,
    });
  },
};
