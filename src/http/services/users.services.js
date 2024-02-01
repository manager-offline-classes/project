const { User, Class } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  getUsersByCondition: async (where, include) => {
    try {
      const user = await User.findAll({
        where: where,
        include: include,
      });

      if (user) {
        return user;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getUser: async (where, include) => {
    try {
      const user = await User.findOne({
        where: where,
        include: include,
      });

      if (user) {
        return user;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
