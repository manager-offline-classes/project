const twoFAutil = require("../../utils/twoFA.util");
const { UserOtp } = require("../../models/index");
module.exports = async (id, email) => {
  await UserOtp.destroy({ where: { userId: id } });
  const otp = Math.floor(1000 + Math.random() * 9000);
  twoFAutil(email, otp);
  await UserOtp.create({
    otp: otp,
    userId: id,
    expires: new Date(Date.now() + 1 * 60 * 1000),
  });
};
