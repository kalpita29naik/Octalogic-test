'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('VehicleTypes', [
      { type_name: 'Hatchback', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type_name: 'SUV', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type_name: 'Sedan', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { type_name: 'Cruiser', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { type_name: 'Sports', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
