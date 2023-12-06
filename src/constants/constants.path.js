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
};

const renderPath = {
  // Auth
  LOGIN_AUTH: "auth/login",
  TWOFA_AUTH: "auth/twoFA",
  FORGET_PASSWORD_AUTH: "auth/forgetPw",
  RESET_PASSWORD_AUTH: "auth/resetPw",
  // Student
  HOME_STUDENT: "students/home/index",

  // Teacher
  HOME_TEACHER: "teachers/home/index",

  // Admin
  HOME_ADMIN: "admin/home/index",
  SETTINGS_ADMIN: "admin/settings/index",
  SETTINGS_ADMIN_INFO: "admin/settings/editInfo",
  SETTINGS_ADMIN_PASSWORD: "admin/settings/editPassword",
};

module.exports = {
  redirectPath,
  renderPath,
};
