const { Course, User } = require("../../../models/index");
const { messageError } = require("../../../constants/constants.message");
module.exports = {
  getCoursesByCondition: async (where) => {
    try {
      const courses = await Course.findAll({
        include: {
          model: User,
        },
        where: where,
      });

      if (courses) {
        return courses;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getCourses: async () => {
    try {
      const course = await Course.findAll();

      if (course) {
        return course;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
