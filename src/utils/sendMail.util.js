const nodemailer = require("nodemailer");
module.exports = async (sendTo, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"Class NguyenNam" ${process.env.MAIL_USER}`,
    to: sendTo, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });
};
