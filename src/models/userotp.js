"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserOtp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserOtp.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserOtp.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      otp: DataTypes.STRING(10),
      userId: DataTypes.INTEGER,
      expires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserOtp",
      tableName: "userotps",
    }
  );
  return UserOtp;
};
