const { StudentsClasses, User, Class } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
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
        include: [
          {
            model: Class,
            include: [
              {
                model: User,
                where: { id: teacherId },
              },
            ],
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
  getById: async (id, include) => {
    try {
      const stdCls = await StudentsClasses.findByPk(id, {
        include: include,
      });
      if (stdCls) {
        return stdCls;
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
  updateById: async (dataUpdate, id) => {
    try {
      const deleteStudentsClasses = await StudentsClasses.update(dataUpdate, {
        where: {
          id: id,
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
