"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseModule.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
      CourseModule.hasMany(models.ModuleDocument, {
        foreignKey: "moduleId",
      });
    }
  }
  CourseModule.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING(200),
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseModule",
      tableName: "coursemodules",
    }
  );
  return CourseModule;
};
