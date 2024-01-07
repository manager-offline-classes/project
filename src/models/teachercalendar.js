"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeacherCalendar.belongsTo(models.User, {
        foreignKey: "teacherId",
      });
      TeacherCalendar.belongsTo(models.Class, {
        foreignKey: "classId",
      });
    }
  }
  TeacherCalendar.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      teacherId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      scheduleStartDate: DataTypes.DATE,
      scheduleEndDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TeacherCalendar",
    }
  );
  return TeacherCalendar;
};
