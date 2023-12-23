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
  USER_LIST_ADMIN: "/admin/users-admin-list",
  USER_EXPORT: "/admin/export-users-excel",
  USER_LIST_TEACHER: "/admin/users-teacher-list",
  USER_LIST_STUDENT: "/admin/users-student-list",
  USER_CREATE: "/admin/users-create",
  USER_UPDATE: "/admin/users-update/",
  USER_DELETE_ADMIN: "/admin/users-admin-delete/",
  // courses
  COURSE_LIST: "/admin/course-list",
  COURSES_EXPORT: "/admin/export-courses-excel",
  COURSE_CREATE: "/admin/course-create",
  COURSE_UPDATE: "/admin/course-update/",
  COURSE_DELETE: "/admin/course-delete/",
  // class
  CLASS_LIST: "/admin/class-list",
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
  USER_CREATE: "admin/users/userCreate",
  USER_LIST: "admin/users/userList",
  // USER_LIST_ADMIN: "admin/users/admin/userList",
  // USER_LIST_STUDENT: "admin/users/student/userList",
  USER_UPDATE: "admin/users/userUpdate",

  // Course
  COURSE_LIST: "admin/courses/courseList",
  COURSE_CREATE: "admin/courses/courseCreate",
  COURSE_UPDATE: "admin/courses/courseUpdate",

  // class
  CLASS_LIST: "admin/classes/classList",
};

module.exports = {
  redirectPath,
  renderPath,
};
