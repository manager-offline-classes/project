"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Settings.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      optKey: DataTypes.STRING,
      optValue: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Settings",
    }
  );
  return Settings;
};
