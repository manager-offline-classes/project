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
        name: "student113",
        email: "student113@gmail.com",
        password: hash.make("1"),
        phone: "06498445432",
        address: "Hai Phong",
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tran lan",
        email: "lanst2333@gmail.com",
        password: hash.make("1"),
        phone: "091545432",
        address: "Hai Phong",
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "nguyen kien",
        email: "kienad23@gmail.com",
        password: hash.make("1"),
        phone: "09848445432",
        address: "Quang Ninh",
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "tran long",
        email: "tranlong8448@gmail.com",
        password: hash.make("1"),
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "hoang an",
        email: "an2000@gmail.com",
        password: hash.make("1"),
        phone: "0844543002",
        address: "Hai Duong",
        typeId: 2,
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
