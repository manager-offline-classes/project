const { StudentsAttendance } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  create: async (dateLearning, statusId, studentId, classId, status) => {
    try {
      const studentAttendance = await StudentsAttendance.create({
        dateLearning: dateLearning,
        statusId: +statusId,
        studentId: +studentId,
        classId: +classId,
        status: +status,
      });
      if (studentAttendance) {
        return studentAttendance;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  destroyByClassId: async (classId) => {
    try {
      const studentAttendance = await StudentsAttendance.destroy({
        where: {
          classId: classId,
        },
      });
      if (studentAttendance) {
        return studentAttendance;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getByCondition: async (where) => {
    try {
      const studentAttendance = await StudentsAttendance.findOne({
        where: where,
      });
      if (studentAttendance) {
        return studentAttendance;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getByClassId: async (classId) => {
    try {
      const studentAttendance = await StudentsAttendance.findAll({
        where: {
          classId: classId,
        },
      });
      if (studentAttendance) {
        return studentAttendance;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
