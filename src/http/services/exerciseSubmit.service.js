const { ExercisesSubmit } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
const { Op } = require("sequelize");
module.exports = {
  create: async (studentId, exerciseId, content, parentId) => {
    try {
      const exercise = await ExercisesSubmit.create({
        studentId: studentId,
        exerciseId: exerciseId,
        content: content,
        parentId: parentId,
      });
      if (exercise) {
        return exercise;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getById: async (id, include) => {
    try {
      const exercise = await ExercisesSubmit.findByPk(id, {
        include: include,
      });
      if (exercise) {
        return exercise;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  destroy: async (id) => {
    try {
      const exerciseSubmit = await ExercisesSubmit.destroy({
        where: {
          [Op.or]: [
            {
              id: id,
            },
            { parentId: id },
          ],
        },
      });
      if (exerciseSubmit) {
        return exerciseSubmit;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
