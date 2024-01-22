"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModuleDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ModuleDocument.belongsTo(models.CourseModule, {
        foreignKey: "moduleId",
      });
    }
  }
  ModuleDocument.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      pathName: DataTypes.STRING(200),
      moduleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ModuleDocument",
    }
  );
  return ModuleDocument;
};
