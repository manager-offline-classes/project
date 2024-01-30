const { User } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  getUsersByCondition: async (where) => {
    try {
      const user = await User.findAll({
        where: where,
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
