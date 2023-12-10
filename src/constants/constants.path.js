const redirectPath = {
  // Auth
  LOGIN_AUTH: "/auth/login",
  TWOFA_AUTH: "/auth/twoFA",
  FORGET_PASSWORD: "/auth/forgetPw",
  RESET_PASSWORD: "/auth/resetPw/",
  RESEND_OTP_AUTH: "/auth/resendOtp",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  LOGIN_GOOGLE: "/auth/google/redirect",
  LOGIN_GITHUB: "/auth/github/redirect",
  LOGIN_FACEBOOK: "/auth/facebook/redirect",
  DISABLE_GOOGLE: "/auth/disableGoogle",
  DISABLE_GITHUB: "/auth/disableGithub",
  DISABLE_FACEBOOK: "/auth/disableFacebook",
  CHANGE_FIRST_PASSWORD_AUTH: "/auth/change-first-password",

  // Student
  HOME_STUDENT: "/student",
  SETTINGS_STUDENT: "/student/setting",

  // Teacher
  HOME_TEACHER: "/teacher",
  SETTINGS_TEACHER: "/teacher/setting",

  // Admin
  HOME_ADMIN: "/admin",
  SETTINGS_ADMIN: "/admin/setting",
  SETTINGS_INFO_ADMIN: "/admin/setting/edit-info",
  SETTINGS_PASSWORD_ADMIN: "/admin/setting/edit-password",
  USER_LIST_ADMIN: "/admin/user-list",
  USER_CREATE_ADMIN: "/admin/user-create",
  USER_UPDATE_ADMIN: "/admin/user-update/",
  USER_DELETE_ADMIN: "/admin/user-delete/"
};

const renderPath = {
  // Auth
  LOGIN_AUTH: "auth/login",
  TWOFA_AUTH: "auth/twoFA",
  FORGET_PASSWORD_AUTH: "auth/forgetPw",
  RESET_PASSWORD_AUTH: "auth/resetPw",
  CHANGE_FIRST_PASSWORD_AUTH: "auth/changeFirstPw",
  // Student
  HOME_STUDENT: "students/home/index",

  // Teacher
  HOME_TEACHER: "teachers/home/index",

  // Admin
  HOME_ADMIN: "admin/home/index",
  SETTINGS_ADMIN: "admin/settings/index",
  SETTINGS_ADMIN_INFO: "admin/settings/editInfo",
  SETTINGS_ADMIN_PASSWORD: "admin/settings/editPassword",
  USER_LIST_ADMIN: "admin/users/userList",
  USER_CREATE_ADMIN: "admin/users/userCreate",
  USER_UPDATE_ADMIN: "admin/users/userUpdate",
};

module.exports = {
  redirectPath,
  renderPath,
};
