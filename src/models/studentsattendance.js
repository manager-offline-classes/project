"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentsAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentsAttendance.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      StudentsAttendance.belongsTo(models.Class, {
        foreignKey: "classId",
      });
      StudentsAttendance.belongsTo(models.LearningStatus, {
        foreignKey: "statusId",
      });
    }
  }
  StudentsAttendance.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      dateLearning: DataTypes.DATE,
      statusId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      status: DataTypes.TINYINT(1),
    },
    {
      sequelize,
      modelName: "StudentsAttendance",
      tableName: "studentsattendances",
    }
  );
  return StudentsAttendance;
};
