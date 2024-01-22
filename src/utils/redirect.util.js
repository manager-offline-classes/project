const { redirectPath } = require("../../src/constants/constants.path");
module.exports = {
  redirectUserList: (type) => {
    if (type === 1) {
      return redirectPath.USER_LIST_STUDENT;
    } else if (type === 2) {
      return redirectPath.USER_LIST_TEACHER;
    } else if (type === 3) {
      return redirectPath.USER_LIST_ADMIN;
    }
  },
};
