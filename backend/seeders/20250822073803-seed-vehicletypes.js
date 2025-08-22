'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('vehicle_types', [
      { type_name: 'Hatchback', wheels: 4 },
      { type_name: 'SUV', wheels: 4, },
      { type_name: 'Sedan', wheels: 4, },
      { type_name: 'Cruiser', wheels: 2 },
      { type_name: 'Sports', wheels: 2, },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('vehicle_types', null, {});
  }
};
