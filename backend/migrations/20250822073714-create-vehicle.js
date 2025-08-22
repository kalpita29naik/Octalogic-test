'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle', {
      vid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('vehicle');
  }
};
