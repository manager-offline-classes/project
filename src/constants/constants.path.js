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

  HOME_ADMIN: "/admin",
  SETTINGS: "/settings",
  SETTINGS_INFO: "/settings/edit-info",
  SETTINGS_PASSWORD: "/settings/edit-password",
  // Admin
  USER_LIST_ADMIN: "/admin/users-admin-list",
  USER_EXPORT: "/admin/export-users-excel",
  USER_LIST_TEACHER: "/admin/users-teacher-list",
  USER_LIST_STUDENT: "/admin/users-student-list",
  USER_CREATE: "/admin/users-create",
  USER_UPDATE: "/admin/users-update/",
  USER_DELETE_ADMIN: "/admin/users-admin-delete/",
  USER_TEACHER_CALANDER: "/admin/users-teacher-list/calendar/",
  TEACHER_CALANDER_ALL: "/admin/users-teacher-list/calendarAll",

  // courses admin
  COURSE_LIST: "/admin/course-list",
  ADMIN_DOCUMENT: "/admin/course-list/document/",
  ADMIN_DOCUMENT_CREATE_CHAPTER: "/admin/course-list/document/create-chapter/",
  ADMIN_DOCUMENT_UPDATE_CHAPTER: "/admin/course-list/document/update-chapter/",
  ADMIN_DOCUMENT_DELETE_CHAPTER: "/admin/course-list/document/delete-chapter/",
  ADMIN_DOCUMENT_CREATE_SECTION: "/admin/course-list/document/create-section/",
  ADMIN_DOCUMENT_UPDATE_SECTION: "/admin/course-list/document/update-section/",
  ADMIN_DOCUMENT_DELETE_SECTION: "/admin/course-list/document/delete-section/",
  COURSES_EXPORT: "/admin/export-courses-excel",
  COURSE_CREATE: "/admin/course-create",
  COURSE_UPDATE: "/admin/course-update/",
  COURSE_DELETE: "/admin/course-delete/",
  // class admin
  CLASS_CREATE: "/admin/class-create",
  CLASS_LIST: "/admin/class-list",
  CLASS_UPDATE: "/admin/class-update/",
  CLASS_ADD_STUDENT: "/admin/class-add-student/",
  CLASS_DELETE: "/admin/class-delete/",

  // teacher
  TEACHER_CLASS_LIST: "/teacher/class-list",
  VIEW_STUDENT_IN_CLASS: "/teacher/class-list/view-student/",
  TEACHER_CALANDER: "/teacher/class-list/calendar",
  TEACHER_ATTENDANCE: "/teacher/class-list/attendance/",
  TEACHER_STUDENT_LIST: "/teacher/student-list",
  TEACHER_LEARNING_STATUS_UPDATE:
    "/teacher/student-list/update-learning-status/",
  TEACHER_COURSE_LIST: "/teacher/course-list",
  TEACHER_DOCUMENT: "/teacher/course-list/document/",
  TEACHER_DOCUMENT_CREATE_CHAPTER:
    "/teacher/course-list/document/create-chapter/",
  TEACHER_DOCUMENT_UPDATE_CHAPTER:
    "/teacher/course-list/document/update-chapter/",
  TEACHER_DOCUMENT_DELETE_CHAPTER:
    "/teacher/course-list/document/delete-chapter/",
  TEACHER_DOCUMENT_CREATE_SECTION:
    "/teacher/course-list/document/create-section/",
  TEACHER_DOCUMENT_UPDATE_SECTION:
    "/teacher/course-list/document/update-section/",
  TEACHER_DOCUMENT_DELETE_SECTION:
    "/teacher/course-list/document/delete-section/",
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
  // SETTINGS
  SETTINGS_ADMIN: "settings/index",
  SETTINGS_ADMIN_INFO: "settings/editInfo",
  SETTINGS_ADMIN_PASSWORD: "settings/editPassword",
  // Admin
  HOME_ADMIN: "admin/home/index",
  USER_CREATE: "admin/users/userCreate",
  USER_LIST: "admin/users/userList",
  TEACHER_LIST: "admin/teachers/teacherList",
  STUDENT_LIST: "admin/students/studentList",
  TEACHER_LIST_CALENDAR: "admin/teachers/teacherCalendar",

  // USER_LIST_ADMIN: "admin/users/admin/userList",
  // USER_LIST_STUDENT: "admin/users/student/userList",
  USER_UPDATE: "admin/users/userUpdate",

  // Course
  COURSE_LIST: "admin/courses/courseList",
  ADMIN_COURSE_DOCUMENT: "admin/courses/documents/document",
  ADMIN_DOCUMENT_CREATE_CHAPTER: "admin/courses/documents/chapterCreate",
  ADMIN_DOCUMENT_UPDATE_CHAPTER: "admin/courses/documents/chapterUpdate",
  ADMIN_DOCUMENT_CREATE_SECTION: "admin/courses/documents/sectionCreate",
  ADMIN_DOCUMENT_UPDATE_SECTION: "admin/courses/documents/sectionUpdate",
  COURSE_CREATE: "admin/courses/courseCreate",
  COURSE_UPDATE: "admin/courses/courseUpdate",

  // class admin
  CLASS_CREATE: "admin/classes/classCreate",
  CLASS_LIST: "admin/classes/classList",
  CLASS_UPDATE: "admin/classes/classUpdate",
  CLASS_ADD_STUDENT: "admin/classes/classAddStudent",

  // class teacher
  TEACHER_CLASS_LIST: "teachers/classes/classList",
  VIEW_STUDENT_IN_CLASS: "teachers/classes/viewStudent",
  TEACHER_CALANDER: "teachers/classes/calendar",
  TEACHER_ATTENDANCE: "teachers/classes/attendance",
  TEACHER_STUDENT_LIST: "teachers/students/index",
  TEACHER_LEARNING_STATUS_UPDATE: "teachers/students/learningStatusUpdate",
  TEACHER_COURSE_LIST: "teachers/courses/courseList",
  TEACHER_COURSE_DOCUMENT: "teachers/courses/documents/document",
  TEACHER_DOCUMENT_CREATE_CHAPTER: "teachers/courses/documents/chapterCreate",
  TEACHER_DOCUMENT_UPDATE_CHAPTER: "teachers/courses/documents/chapterUpdate",
  TEACHER_DOCUMENT_CREATE_SECTION: "teachers/courses/documents/sectionCreate",
  TEACHER_DOCUMENT_UPDATE_SECTION: "teachers/courses/documents/sectionUpdate",
};

module.exports = {
  redirectPath,
  renderPath,
};
