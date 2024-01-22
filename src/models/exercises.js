"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exercises.belongsTo(models.Class, {
        foreignKey: "classId",
      });
      Exercises.hasMany(models.ExercisesSubmit, {
        foreignKey: "exerciseId",
      });
    }
  }
  Exercises.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      classId: DataTypes.INTEGER,
      title: DataTypes.STRING(200),
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING(200),
    },
    {
      sequelize,
      modelName: "Exercises",
    }
  );
  return Exercises;
};
