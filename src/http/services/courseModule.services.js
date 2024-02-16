const { CourseModule } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  createCourseModule: async (name, courseId) => {
    try {
      const courseModule = await CourseModule.create({
        name: name,
        courseId: courseId,
      });

      if (courseModule) {
        return courseModule;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  updateById: async (dataUpdate, id) => {
    try {
      const courseModule = await CourseModule.update(dataUpdate, {
        where: {
          id: id,
        },
      });

      if (courseModule) {
        return courseModule;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getByPk: async (id, include) => {
    try {
      const courseModule = await CourseModule.findByPk(id, {
        include: include,
      });

      if (courseModule) {
        return courseModule;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  destroyById: async (id) => {
    try {
      const courseModule = await CourseModule.destroy({
        where: {
          id: id,
        },
      });

      if (courseModule) {
        return courseModule;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
