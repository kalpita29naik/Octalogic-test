import { DataType } from 'Sequelize';
const sequelize = require('../db');
const User = require('./User');
const Vehicle = require('./Vehicles');

const Bookings = sequelize.define('Bookings', {
 bookingID: {
  type: DataType.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },

 start_date: {
  type: DataType.DATEONLY,
  allowNULL: false
 },

 end_date: {
  type: DataType.DATEONLY,
  allowNULL: false
 },
 userID: {
  type: DataTypes.INTEGER,
  allowNull: false
 },
 VID: {
  type: DataTypes.INTEGER,
  allowNull: false
 }


}, { tableName: 'booking', timestamp: false })

Bookings.belongsTo(User, { foreignKey: 'userID' });
Bookings.belongsTo(Vehicle, { foreignKey: 'VID' });

module.exports = Bookings;