"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersColumn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersColumn.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UsersColumn.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      featureName: DataTypes.STRING(100),
      status: DataTypes.TINYINT(1),
      position: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersColumn",
    }
  );
  return UsersColumn;
};
