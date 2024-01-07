"use strict";

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
    return queryInterface.bulkInsert("Courses", [
      {
        name: "Full-stack",
        price: 15000000,
        teacherId: 105,
        tryLearn: 3,
        quantity: 30,
        duration: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Back-end",
        price: 13000000,
        teacherId: 104,
        tryLearn: 2,
        quantity: 20,
        duration: 40,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Font-end",
        price: 12000000,
        teacherId: 105,
        tryLearn: 2,
        quantity: 20,
        duration: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "PHP",
        price: 11000000,
        teacherId: 104,
        quantity: 20,

        duration: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Courses", null, {});
  },
};
