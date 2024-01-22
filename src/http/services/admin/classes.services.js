const { Class, TeacherCalendar } = require("../../../models/index");
const { messageError } = require("../../../constants/constants.message");
module.exports = {
  createClass: async (
    name,
    quantity,
    startDate,
    endDate,
    schedule,
    timeLearn,
    courseId
  ) => {
    try {
      const classItem = await Class.create({
        name: name,
        quantity: quantity,
        startDate: startDate,
        endDate: endDate,
        schedule: schedule,
        timeLearn: timeLearn,
        courseId: courseId,
      });
      if (classItem) {
        return classItem;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  updateClass: async (option, where) => {
    try {
      const classItem = await Class.update(option, where);
      if (classItem) {
        return classItem;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getClassById: async (id, option) => {
    try {
      const classItem = await Class.findByPk(id, option);
      if (classItem) {
        return classItem;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },

  getClassAndCountByCondition: async (where) => {
    try {
      const classAndCount = await Class.findAndCountAll({
        where: where,
      });
      if (classAndCount) {
        return classAndCount;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getTeacherCalendarAll: async (model, model2) => {
    try {
      const teacherCalendar = await TeacherCalendar.findAll({
        include: [
          {
            model: model,
          },
          {
            model: model2,
          },
        ],
      });
      if (teacherCalendar) {
        return teacherCalendar;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getTeacherCalendarByTeacherId: async (id, model) => {
    try {
      const teacherCalendar = await TeacherCalendar.findAll({
        where: {
          teacherId: id,
        },
        include: {
          model: model,
        },
      });
      if (teacherCalendar) {
        return teacherCalendar;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  createTeacherCalendar: async (
    teacherId,
    classId,
    scheduleStartDate,
    scheduleEndDate
  ) => {
    try {
      const teacherCalendar = await TeacherCalendar.create({
        teacherId: teacherId,
        classId: classId,
        scheduleStartDate: scheduleStartDate,
        scheduleEndDate: scheduleEndDate,
      });
      if (teacherCalendar) {
        return teacherCalendar;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  updateClassByCondition: async (option, where) => {
    try {
      const classItem = await Class.update(option, where);
      if (classItem) {
        return classItem;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  destroyCLassById: async (id) => {
    try {
      const classItem = await Class.destroy({
        where: {
          id: id,
        },
      });
      if (classItem) {
        return classItem;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
