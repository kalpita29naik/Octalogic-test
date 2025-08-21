const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Vehicle = require('./Vehicle');

const Bookings = sequelize.define('Bookings', {
 bookingID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },

 start_date: {
  type: DataTypes.DATEONLY,
  allowNull: false
 },

 end_date: {
  type: DataTypes.DATEONLY,
  allowNull: false
 },

 userID: {
  type: DataTypes.INTEGER,
  allowNull: false
 },

 VID: {
  type: DataTypes.INTEGER,
  allowNull: false
 }
}, {
 tableName: 'booking',
 timestamps: false
});


Bookings.belongsTo(User, { foreignKey: 'userID' });
Bookings.belongsTo(Vehicle, { foreignKey: 'VID' });

module.exports = Bookings;
