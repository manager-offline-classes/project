const { ModuleDocument } = require("../../models/index");
const { messageError } = require("../../constants/constants.message");
module.exports = {
  create: async (content, pathName, courseModuleId) => {
    try {
      const moduleDocument = await ModuleDocument.create({
        content: content,
        pathName: pathName,
        moduleId: courseModuleId,
      });

      if (moduleDocument) {
        return moduleDocument;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  getByPk: async (id, include) => {
    try {
      const moduleDocument = await ModuleDocument.findByPk(id, {
        include: include,
      });

      if (moduleDocument) {
        return moduleDocument;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  updateById: async (dataUpdate, id) => {
    try {
      const moduleDocument = await ModuleDocument.update(dataUpdate, {
        where: {
          id: id,
        },
      });

      if (moduleDocument) {
        return moduleDocument;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
  deleteById: async (id) => {
    try {
      const moduleDocument = await ModuleDocument.destroy({
        where: {
          id: id,
        },
      });

      if (moduleDocument) {
        return moduleDocument;
      }
    } catch (err) {
      console.log(err);
      throw new Error(messageError.SERVER_ERROR);
    }
  },
};
