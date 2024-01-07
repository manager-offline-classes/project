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
};
