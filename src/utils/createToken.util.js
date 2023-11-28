const { LoginToken } = require("../models/index");
const md5 = require("md5");
module.exports = async (id) => {
  const loginToken = await LoginToken.findOne({
    where: {
      userId: id,
    },
  });
  const cookie = md5(Math.random());
  if (!loginToken) {
    await LoginToken.create({
      userId: id,
      token: cookie,
    });
  } else {
    await LoginToken.destroy({
      where: {
        userId: id,
      },
    });
    console.log(id);
    await LoginToken.create({
      userId: id,
      token: cookie,
    });
  }
  return cookie;
};
