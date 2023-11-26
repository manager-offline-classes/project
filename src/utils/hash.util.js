const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  make: (password) => {
    return bcrypt.hashSync(password, saltRounds);
  },
  check: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
};
