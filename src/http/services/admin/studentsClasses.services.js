const { StudentsClasses, User, Class } = require("../../../models/index");
const { messageError } = require("../../../constants/constants.message");
module.exports = {
  getStudentsClassesByClassId: async (classId, include) => {
    try {
      const studentClasses = await StudentsClasses.findAll({
        where: {
          classId: classId,
        },
        include: include,
      });
      if (studentClasses) {
        return studentClasses;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getStudentClassesByTeacherId: async (teacherId) => {
    try {
      const studentClasses = await StudentsClasses.findAll({
        // include: [
        //   {
        //     model: Class,
        //     include: [
        //       {
        //         model: User,
        //         where: { id: teacherId },
        //       },
        //     ],
        //   },
        // ],
        include: [
          {
            model: Class,
          },
          {
            model: User,
            where: { id: teacherId },
          },
        ],
      });

      if (studentClasses) {
        return studentClasses;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },

  createStudentsClasses: async (
    studentId,
    classId,
    statusId,
    completedDate,
    dropDate,
    recover
  ) => {
    try {
      const studentClass = await StudentsClasses.create({
        studentId: studentId,
        classId: classId,
        statusId: statusId,
        completedDate: completedDate,
        dropDate: dropDate,
        recover: recover,
      });
      if (studentClass) {
        return studentClass;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  deleteStudentsClassesByClassId: async (classId) => {
    try {
      const deleteStudentsClasses = await StudentsClasses.destroy({
        where: {
          classId: classId,
        },
      });
      if (deleteStudentsClasses) {
        return deleteStudentsClasses;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
