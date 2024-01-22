const nodemailer = require("nodemailer");
module.exports = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"Class NguyenNam" ${process.env.MAIL_USER}`, // sender address
    to: email, // list of receivers
    subject: "Xác minh hai bước", // Subject line
    text: `Mã xác minh của bạn là ${otp} `, // plain text body
    html: `<b>Mã xác minh của bạn là ${otp}. Mã có hiệu lực 5 phút </b>`, // html body
  });
};
