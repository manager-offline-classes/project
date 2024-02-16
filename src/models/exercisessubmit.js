"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExercisesSubmit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExercisesSubmit.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      ExercisesSubmit.belongsTo(models.Exercises, {
        foreignKey: "exerciseId",
      });
    }
  }
  ExercisesSubmit.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      studentId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING(200),
    },
    {
      sequelize,
      modelName: "ExercisesSubmit",
      tableName: "exercisessubmits",
    }
  );
  return ExercisesSubmit;
};
