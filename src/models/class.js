"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
      Class.belongsToMany(models.User, {
        through: "ClassesTeacher",
        foreignKey: "classId",
      });
      // Class.belongsToMany(models.User, {
      //   through: "StudentsClasses",
      //   foreignKey: "studentId",
      // });
      Class.hasMany(models.TeacherCalendar, {
        foreignKey: "classId",
      });
      Class.hasMany(models.StudentsClasses, {
        foreignKey: "classId",
      });
      Class.hasMany(models.StudentsAttendance, {
        foreignKey: "classId",
      });
      Class.hasMany(models.Exercises, {
        foreignKey: "classId",
      });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      quantity: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      schedule: DataTypes.STRING(50),
      timeLearn: DataTypes.STRING(50),
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
