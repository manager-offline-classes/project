const messageError = {
  //auth
  SERVER_ERROR: "Lỗi server!",
  ERROR_INFO: "Vui lòng nhập lại thông tin",
  ONE_DEVICES: "Bạn đã bị đăng xuất vì đã đăng nhập nơi khác!",
  NO_USERS: "Không tồn tại tài khoản",
  INVALID_PASSWORD: "Mật khẩu không chính xác",
  PASSWORD_SAME: "Vui lòng nhập mật khẩu mới giống nhau!",
  EMPTY_PASSWORD: "Mật khẩu bắt buộc phải nhập!",
  WEAK_PASSWORD:
    "Mật khẩu yếu! Mật khẩu mạnh bao gồm ít nhất: 6 ký tự, 1 chữ cái hoa, 1 chữ cái thường, 1 số, 1 ký tự đặc biệt",
  INVALID_OTP: "Mã xác minh không đúng! Vui lòng nhập lại",
  EXPIRED_OTP: "Mã xác minh đã hết hạn!",
  ACCOUNT_NOT_LINK: "Đăng nhập thất bại. Tài khoản chưa được liên kết",
  NO_EMAILS: "Không tồn tại email!",
  EMPTY_EMAIL: "Email bắt buộc phải nhập!",
  FORMAT_EMAIL: "Không đúng định dạng email!",
  DUPLICATE_EMAIL: "Email đã có người sử dụng!",
  LENGTH_EMAIL: "Email không quá 100 ký tự!",

  EMPTY_NAME: "Tên bắt buộc phải nhập!",
  LENGTH_NAME: "Độ dài của tên vượt quá giới hạn!",
  DUPLICATE_NAME: "Tên bị trùng lặp",

  LENGTH_PHONE: "Không tồn tại số điện thoại này!",
  DUPLICATE_PHONE: "Số điện thoại đã được sử dụng!",
  EMPTY_PHONE: "Số điện thoại bắt buộc phải nhập!",

  LENGTH_ADDRESS: "Vượt quá kí tự cho phép!",
  EMTPY_TYPE: "Vui lòng chọn chức vụ!",

  EMPTY_PRICE: "Vui lòng nhập giá tiền",
  LENGTH_PRICE: "Giá tiền vượt quá giới hạn",

  TIME_COMPARE: "Thời gian sau phải lớn hơn thời gian trước",
  TIME_SCHEDULE: "Lịch học phải có ngày trùng với ngày khai giảng!",

  EMPTY: "Vui lòng nhập trường trên !",
  LENGTH: "Vượt quá giới hạn cho phép !",

  //   user
  ACCOUNT_LINKED:
    "Liên kết thất bại! Tài khoản này đã được liên kết với một tài khoản khác.",
};
const messageSuccess = {
  //auth
  DELETE: "Xóa thành công!",
  CHANGE_PASSWORD: "Đổi mật khẩu thành công!",
  //   user
  SUCCESSFUL_LINK: "Liên kết thành công.",
  UPDATE_SUCCESS: "Cập nhật dữ liệu thành công",
  DELETE_LINK: "Xóa liên kết thành công",
  CREATE_USER:
    "Tạo tài khoản thành công! Đã gửi mật khẩu đến email người dùng.",
  CREATE_COURSE: "Thêm khóa học thành công!",
  UPDATE_USER: "Sửa tài khoản thành công",
  DELETE_USER: "Xóa tài khoản thành công",
  CREATE_CLASS: "Thêm lớp học thành công!",
};

const messageInfo = {
  STUDENT: "Học viên",
  TEACHER: "Giảng viên",
  ADMIN: "Admin",
  SUBJECT_CREATE_USER: "Cài Đặt Mật Khẩu Cho Tài Khoản của Bạn",
  WAIT_A_MINUTE: "Vui lòng chờ trong giây lát",
  CHECK_EMAIL: "Gửi email thành công! Vui lòng kiểm tra email",
};

module.exports = { messageError, messageSuccess, messageInfo };
