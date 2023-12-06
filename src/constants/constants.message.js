const messageError = {
  //auth
  NO_USERS: "Không tồn tại tài khoản",
  INVALID_PASSWORD: "Mật khẩu không chính xác",
  INVALID_OTP: "Mã xác minh không đúng! Vui lòng nhập lại",
  ACCOUNT_NOT_LINK: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
  NO_EMAILS: "Không tồn tại email!",
  PASSWORD_SAME: "Vui lòng nhập mật khẩu mới giống nhau!",
  //   user
  ACCOUNT_LINKED:
    "Liên kết thất bại! Tài khoản này đã được liên kết với một tài khoản khác.",
};
const messageSuccess = {
  //auth
  CHANGE_PASSWORD: "Đổi mật khẩu thành công!",
  //   user
  SUCCESSFUL_LINK: "Liên kết thành công.",
  UPDATE_SUCCESS: "Cập nhật dữ liệu thành công",
  DELETE_LINK: "Xóa liên kết thành công",
};

const messageInfo = {
  WAIT_A_MINUTE: "Vui lòng chờ trong giây lát",
  EXPIRED_OTP: "Mã xác minh đã hết hạn",
  CHECK_EMAIL: "Gửi email thành công! Vui lòng kiểm tra email",
};

module.exports = { messageError, messageSuccess, messageInfo };
