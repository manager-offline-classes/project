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
    let users = [];
    users.push(
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: hash.make("1"),
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nguyen thanh nam",
        email: "nam2002bv@gmail.com",
        password: hash.make("1"),
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    for (let i = 0; i < 100; i++) {
      let user = {
        name: `nguyen van ${i}`,
        email: `nguyenvan${i}@gmail.com`,
        password: hash.make(`${i}`),
        phone: `09${Math.floor(Math.random() * 90000000 + 10000000)}`,
        typeId: Math.ceil(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
    }

    return queryInterface.bulkInsert("Users", users);
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
