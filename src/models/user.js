"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Type, {
        foreignKey: "typeId",
      });
      User.hasOne(models.LoginToken, {
        foreignKey: "userId",
      });
      User.hasMany(models.UserSocial, {
        foreignKey: "userId",
      });
      User.BelongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey: "userId",
      });
      User.BelongsToMany(models.Permission, {
        through: "UserPermissions",
        foreignKey: "userId",
      });
      User.hasOne(models.UserOtp, {
        foreignKey: "userId",
      });
      User.hasMany(models.Course, {
        foreignKey: "userId",
      });
      User.belongsToMany(models.Class, {
        through: "ClassesTeacher",
        foreignKey: "teacherId",
      });
      User.hasMany(models.TeacherCalendar, {
        foreignKey: "teacherId",
      });
      User.hasMany(models.StudentsClasses, {
        foreignKey: "studentId",
      });
      User.hasMany(models.ExercisesSubmit, {
        foreignKey: "studentId",
      });
      User.hasMany(models.ExercisesSubmit, {
        foreignKey: "studentId",
      });
      User.hasMany(models.UsersColumn, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      firstLogin: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
