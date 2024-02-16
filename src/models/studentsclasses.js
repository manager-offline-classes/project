"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentsClasses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentsClasses.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      StudentsClasses.belongsTo(models.Class, {
        foreignKey: "classId",
      });
      StudentsClasses.belongsTo(models.LearningStatus, {
        foreignKey: "statusId",
      });
    }
  }
  StudentsClasses.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      completedDate: DataTypes.DATE,
      dropDate: DataTypes.DATE,
      recover: DataTypes.DATE,
      reasonStatus: DataTypes.TEXT,
      dateStatus: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "StudentsClasses",
      tableName: "studentsclasses",
    }
  );
  return StudentsClasses;
};
