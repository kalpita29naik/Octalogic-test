'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle', {
      vid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      vname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vtypeid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicle_types',
          key: 'vtypeid'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('vehicle');
  }
};
