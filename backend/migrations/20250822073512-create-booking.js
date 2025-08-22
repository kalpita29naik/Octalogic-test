'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking', {
      bookingid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'userid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      vid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicle',
          key: 'vid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('booking');
  }
};
