const { check, body } = require("express-validator");
const { messageError } = require("../../constants/constants.message");
const { User, UserOtp, Class } = require("../../models/index");
const hashUtil = require("../../utils/hash.util");
const { Op } = require("sequelize");
const moment = require("moment");
const validateLoginAccount = () => {
  return [
    check("email", messageError.EMPTY_EMAIL).notEmpty(),

    check("email", messageError.FORMAT_EMAIL).isEmail(),
    check("email").custom(async (value) => {
      console.log(value);
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error(messageError.NO_EMAILS);
      } else {
        return true;
      }
    }),
    check("password", messageError.EMPTY_PASSWORD).notEmpty(),
    check("password").custom(async (value, { req }) => {
      const email = req.body?.email;
      if (email) {
        const user = await User.findOne({ where: { email: email } });
        const isPassword = hashUtil.check(value, user.password);
        if (!isPassword) {
          throw new Error(messageError.INVALID_PASSWORD);
        }
      }
    }),
  ];
};
const validateForgetPassword = () => {
  return [
    check("email", messageError.EMPTY_EMAIL).notEmpty(),

    check("email", messageError.FORMAT_EMAIL).isEmail(),
    check("email").custom(async (value) => {
      console.log(value);
      const user = await User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error(messageError.NO_EMAILS);
      }
    }),
  ];
};
const validateTwoFA = () => {
  return [
    check("otp").custom(async (value, { req }) => {
      const id = req.user.id;
      const userOtp = await UserOtp.findOne({
        where: {
          userId: id,
        },
      });
      if (userOtp.expires < new Date()) {
        throw new Error(messageError.EXPIRED_OTP);
      } else {
        if (value !== userOtp.otp) {
          throw new Error(messageError.INVALID_OTP);
        }
      }
    }),
  ];
};
const validateResetPassword = () => {
  return [
    check("password", messageError.EMPTY_PASSWORD).notEmpty(),
    check("password").custom((password, { req }) => {
      const { rePassword } = req.body;
      if (password !== rePassword) {
        throw new Error(messageError.PASSWORD_SAME);
      } else {
        return true;
      }
    }),
    check("password", messageError.WEAK_PASSWORD).isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ];
};
const validateInfo = () => {
  return [
    body("name", messageError.EMPTY_NAME).notEmpty(),
    body("name", messageError.LENGTH_NAME).isLength({ max: 50 }),
    body("email", messageError.EMPTY_EMAIL).notEmpty(),

    body("email", messageError.FORMAT_EMAIL).isEmail(),
    body("email", messageError.LENGTH_EMAIL).isLength({ max: 100 }),
    body("email").custom(async (value, { req }) => {
      const id = req.user.id;
      const user = await User.findOne({
        where: { email: value, id: { [Op.not]: id } },
      });
      if (user) {
        throw new Error(messageError.DUPLICATE_EMAIL);
      }
    }),
    body("phone").custom(async (value, { req }) => {
      if (value === "") {
        throw new Error(messageError.EMPTY_PHONE);
      }
      const id = req.user.id;
      const user = await User.findOne({
        where: { phone: value, id: { [Op.not]: id } },
      });
      if (user) {
        throw new Error(messageError.DUPLICATE_PHONE);
      }
    }),
    body("phone", messageError.LENGTH_PHONE).isLength({ min: 10, max: 15 }),
    body("address", messageError.LENGTH_ADDRESS).isLength({ max: 200 }),

    // body("name")
    //   .isLength({ min: 0, max: 50 })
    //   .withMessage(messageError.LENGTH_NAME),
  ];
};
const validateChangePassword = () => {
  return [
    body("oldPassword", messageError.EMPTY_PASSWORD).notEmpty(),
    body("newPassword", messageError.EMPTY_PASSWORD).notEmpty(),
    body("rePassword", messageError.EMPTY_PASSWORD).notEmpty(),
    body("oldPassword").custom((value, { req }) => {
      const user = req.user;
      const { newPassword, rePassword } = req.body;
      const check = hashUtil.check(value, user.password);
      if (!check) {
        throw new Error(messageError.INVALID_PASSWORD);
      } else if (newPassword !== rePassword) {
        throw new Error(messageError.PASSWORD_SAME);
      } else {
        return true;
      }
    }),
    body("newPassword", messageError.WEAK_PASSWORD).isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ];
};
const validateAddUser = () => {
  return [
    body("name", messageError.LENGTH_NAME).isLength({ max: 50 }),
    body("email", messageError.EMPTY_EMAIL).notEmpty(),

    body("email", messageError.FORMAT_EMAIL).isEmail(),
    body("email", messageError.LENGTH_EMAIL).isLength({ max: 100 }),
    body("email").custom(async (value, { req }) => {
      const idUpdate = req.params.id;
      let user;
      // form Update
      if (idUpdate) {
        user = await User.findOne({
          where: {
            email: value,
            id: {
              [Op.not]: idUpdate,
            },
          },
        });
      } else {
        user = await User.findOne({
          where: { email: value },
        });
      }
      if (user) {
        throw new Error(messageError.DUPLICATE_EMAIL);
      }
    }),
    body("phone").custom(async (value, { req }) => {
      const idUpdate = req.params.id;
      if (value === "") {
        throw new Error(messageError.EMPTY_PHONE);
      }
      let user;
      // form Update
      if (idUpdate) {
        console.log(666);
        user = await User.findOne({
          where: {
            phone: value,
            id: {
              [Op.not]: idUpdate,
            },
          },
        });
        console.log(user);
      } else {
        console.log(999);
        user = await User.findOne({
          where: { phone: value },
        });
      }
      if (user) {
        throw new Error(messageError.DUPLICATE_PHONE);
      }
    }),
    body("phone", messageError.LENGTH_PHONE).isLength({ min: 10, max: 15 }),
    body("address", messageError.LENGTH_ADDRESS).isLength({ max: 200 }),
    body("typeId").custom(async (value) => {
      if (value === "0") {
        throw new Error(messageError.EMTPY_TYPE);
      }
    }),
  ];
};

const validateAddCourse = () => {
  return [
    body(
      ["name", "tryLearn", "price", "quantity", "duration", "teacherId"],
      messageError.EMPTY
    ).notEmpty(),
    body("name", messageError.LENGTH).isLength({ max: 200 }),
    body(
      ["tryLearn", "price", "quantity", "duration", "teacherId"],
      messageError.LENGTH
    ).isLength({ max: 11 }),
    body(["tryLearn", "price", "quantity", "duration"]).custom(
      async (value) => {
        if (value < 0) {
          throw new Error(messageError.LENGTH);
        }
      }
    ),
  ];
};
const validateAddClass = () => {
  return [
    body(
      ["courseId", "name", "startDate", "schedule", "timeLearn"],
      messageError.EMPTY
    ).notEmpty(),
    body("name", messageError.LENGTH).isLength({ max: 200 }),
    body("name").custom(async (value) => {
      classItem = await Class.findOne({
        where: {
          name: value,
        },
      });
      if (classItem) {
        throw new Error(messageError.DUPLICATE_NAME);
      }
    }),
    body("timeLearn").custom(async (value) => {
      const format = "HH:mm";
      for (let i = 0; i < value.length - 1; i += 2) {
        const today = moment().format("YYYY-MM-DD");
        const timeStart = moment(
          `${today} ${value[i]}`,
          `YYYY-MM-DD ${format}`
        );
        const timeEnd = moment(
          `${today} ${value[i + 1]}`,
          `YYYY-MM-DD ${format}`
        );
        if (timeStart.isSameOrAfter(timeEnd)) {
          throw new Error(messageError.TIME_COMPARE);
        }
      }
    }),
    body("schedule").custom(async (value, { req }) => {
      let { startDate } = req.body;
      console.log(3045640654);
      console.log(startDate);
      console.log(value);
      let currentDate = moment(startDate).startOf("day");
      console.log(currentDate);
      const dayOfWeek = currentDate.day().toString();
      console.log(dayOfWeek);
      if (!value.includes(dayOfWeek)) {
        throw new Error(messageError.TIME_SCHEDULE);
      }
    }),
  ];
};
const validateUpdateClass = () => {
  return [
    body(
      ["courseId", "name", "startDate", "schedule", "timeLearn"],
      messageError.EMPTY
    ).notEmpty(),
    body("name", messageError.LENGTH).isLength({ max: 200 }),
    body("name").custom(async (value, { req }) => {
      const classId = req.params.id;
      console.log(6596455);
      console.log(classId);
      classItem = await Class.findOne({
        where: {
          name: value,
          id: {
            [Op.not]: classId,
          },
        },
      });
      if (classItem) {
        throw new Error(messageError.DUPLICATE_NAME);
      }
    }),
    body("timeLearn").custom(async (value) => {
      const format = "HH:mm";
      for (let i = 0; i < value.length - 1; i += 2) {
        const today = moment().format("YYYY-MM-DD");
        const timeStart = moment(
          `${today} ${value[i]}`,
          `YYYY-MM-DD ${format}`
        );
        const timeEnd = moment(
          `${today} ${value[i + 1]}`,
          `YYYY-MM-DD ${format}`
        );
        if (timeStart.isSameOrAfter(timeEnd)) {
          throw new Error(messageError.TIME_COMPARE);
        }
      }
    }),
    body("schedule").custom(async (value, { req }) => {
      let { startDate } = req.body;
      console.log(3045640654);
      console.log(startDate);
      console.log(value);
      let currentDate = moment(startDate).startOf("day");
      console.log(currentDate);
      const dayOfWeek = currentDate.day().toString();
      console.log(dayOfWeek);
      if (!value.includes(dayOfWeek)) {
        throw new Error(messageError.TIME_SCHEDULE);
      }
    }),
  ];
};
const validateCreateChapter = () => {
  return [
    body("name", messageError.EMPTY).notEmpty(),
    body("name", messageError.LENGTH).isLength({ max: 200 }),
  ];
};
const validateCreateSection = () => {
  return [
    body(["content", "pathName"], messageError.EMPTY).notEmpty(),
    body("pathName", messageError.LENGTH).isLength({ max: 200 }),
  ];
};
const validateLearningStauts = () => {
  return [
    body(["content", "pathName"], messageError.EMPTY).notEmpty(),
    body("pathName", messageError.LENGTH).isLength({ max: 200 }),
  ];
};
module.exports = {
  validateLoginAccount,
  validateForgetPassword,
  validateTwoFA,
  validateResetPassword,
  validateInfo,
  validateChangePassword,
  validateAddUser,
  validateAddCourse,
  validateAddClass,
  validateUpdateClass,
  validateCreateChapter,
  validateCreateSection,
  validateLearningStauts,
};
