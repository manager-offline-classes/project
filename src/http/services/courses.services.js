const { Course, User } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  getCoursesById: async (id, include) => {
    try {
      const courses = await Course.findByPk(id, {
        include: include,
      });

      if (courses) {
        return courses;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
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
