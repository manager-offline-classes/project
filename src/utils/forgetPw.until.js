const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
module.exports = async (email) => {
  const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
    expiresIn: 5 * 60,
  });
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const linkResetPw = `http://localhost:${process.env.PORT}/auth/resetPw/${token}`;
  await transporter.sendMail({
    from: `"Class NguyenNam" ${process.env.MAIL_USER}`, // sender address
    to: email, // list of receivers
    subject: "Quên mật khẩu", // Subject line
    text: `Nhấp vào link dưới đây để thay đổi mật khẩu ${linkResetPw}`, // plain text body
    html: `<b>Nhấp vào link dưới đây để thay đổi mật khẩu (hiệu lực 5 phút)</b> <br>
        ${linkResetPw}`, // html body
  });
};
