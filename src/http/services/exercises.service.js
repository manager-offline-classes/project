const { Exercises } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  getExerciseById: async (id, include) => {
    try {
      const exercises = Exercises.findOne({
        where: {
          id: id,
        },
        include: include,
      });
      if (exercises) {
        return exercises;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getByClassId: async (classId, include) => {
    try {
      const exercises = Exercises.findAll({
        where: {
          classId: classId,
        },
        include: include,
      });
      if (exercises) {
        return exercises;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  create: async (classId, title, content, attachment) => {
    try {
      const exercise = await Exercises.create({
        classId: classId,
        title: title,
        content: content,
        attachment: attachment,
      });
      if (exercise) {
        return exercise;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  update: async (id, title, content, attachment) => {
    try {
      const exercise = await Exercises.update(
        {
          title: title,
          content: content,
          attachment: attachment,
        },
        {
          where: {
            id: id,
          },
        }
      );
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
      const exercise = await Exercises.destroy({
        where: {
          id: id,
        },
      });
      if (exercise) {
        return exercise;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
