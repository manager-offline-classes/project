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
        // onDelete: "CASCADE",
      });
      User.belongsToMany(models.Role, {
        through: "userroles",
        foreignKey: "userId",
      });
      User.belongsToMany(models.Permission, {
        through: "userpermissions",
        foreignKey: "userId",
      });
      User.hasOne(models.UserOtp, {
        foreignKey: "userId",
      });
      User.hasMany(models.Course, {
        foreignKey: "teacherId",
      });
      User.belongsToMany(models.Class, {
        through: "classesteacher",
        foreignKey: "teacherId",
      });

      // User.belongsToMany(models.Class, {
      //   through: "StudentsClasses",
      //   foreignKey: "studentId",
      // });
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
      name: DataTypes.STRING(50),
      email: DataTypes.STRING(100),
      password: DataTypes.STRING(100),
      phone: DataTypes.STRING(15),
      address: DataTypes.STRING(200),
      typeId: DataTypes.INTEGER,
      firstLogin: DataTypes.TINYINT(1),
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
