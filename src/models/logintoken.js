"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoginToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LoginToken.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  LoginToken.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "LoginToken",
    }
  );
  return LoginToken;
};
