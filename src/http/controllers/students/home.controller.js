const model = require("../../../models/index");
module.exports = {
  index: async (req, res) => {
    return res.render("students/index");
  },
};
