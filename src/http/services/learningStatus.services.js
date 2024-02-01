const { LearningStatus } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  getAll: async () => {
    try {
      const learningStatus = LearningStatus.findAll();
      if (learningStatus) {
        return learningStatus;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
