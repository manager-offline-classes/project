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
    return queryInterface.bulkInsert("LearningStatuses", [
      {
        name: "Đang Học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hoàn Thành",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thôi Học",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bảo Lưu",
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
    return queryInterface.bulkDelete("LearningStatuses", null, {});
  },
};
