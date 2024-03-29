"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LearningStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LearningStatus.hasOne(models.StudentsClasses, {
        foreignKey: "statusId",
      });
      LearningStatus.hasMany(models.StudentsAttendance, {
        foreignKey: "statusId",
      });
    }
  }
  LearningStatus.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "LearningStatus",
      tableName: "learningstatuses",
    }
  );
  return LearningStatus;
};
