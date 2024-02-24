const nodemailer = require("nodemailer");
const url = require("url");
const jwt = require("jsonwebtoken");
module.exports = async (req, email) => {
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
  const url = req.protocol + "://" + req.get("host");
  const linkResetPw = `${url}/auth/resetPw/${token}`;
  console.log(23442);
  console.log(linkResetPw);
  await transporter.sendMail({
    from: `"Class NguyenNam" ${process.env.MAIL_USER}`, // sender address
    to: email, // list of receivers
    subject: "Quên mật khẩu", // Subject line
    text: `Nhấp vào link dưới đây để thay đổi mật khẩu ${linkResetPw}`, // plain text body
    html: `<b>Nhấp vào link dưới đây để thay đổi mật khẩu (hiệu lực 5 phút)</b> <br>
        ${linkResetPw}`, // html body
  });
};
