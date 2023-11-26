"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Course.hasMany(models.CourseModule, {
        foreignKey: "courseId",
      });
      Course.hasMany(models.Class, {
        foreignKey: "courseId",
      });
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      price: DataTypes.INTEGER,
      teacherId: DataTypes.INTEGER,
      tryLearn: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
