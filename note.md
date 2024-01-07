# authen

1. Đăng nhập
2. Xác minh 2 bước qua OTP
3. Quên mật / Đặt lại mật khẩu
4. Đăng nhập trên 1 thiết bị (Thiết bị trc sẽ bị đăng xuất)
5. Trang tài khoản:

- Cập nhật thông tin cá nhân
- Liên kết / hủy bỏ tài khoản mạng xã hội để đăng nhập nhanh

6. Đăng nhập thông qua tài khoản mạng xã hội đã liên kết
7. Đổi mật khẩu (Sau khi đã đăng nhập)
8. Đăng xuất
9. Chuyển hướng các route sau khi đã đăng nhập xong (Giảng viên / học viên / quản trị)
10. Đăng nhập lần đầu tiên --> Bắt buộc phải đổi mật khẩu

# Quy ước router

## Đối tượng quản trị:

prefix: /admin

## Đối tượng học viên:

prefix: /

## Đối tượng giảng viên:

prefix: /teacher

## Đối tượng xác thực:

prefix: /auth
