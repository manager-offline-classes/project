"use strict";
const hash = require("../../utils/hash.util");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        name: "nguyen van an",
        email: "1@gmail.com",
        password: hash.make("1"),
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nguyen van ban",
        email: "2@gmail.com",
        password: hash.make("2"),
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nguyen van can",
        email: "3@gmail.com",
        password: hash.make("3"),
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
