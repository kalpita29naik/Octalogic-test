import { Sequelize, DataTypes } from 'sequelize';
const sequelize = require('../db');
const VehicleType = require('./VehicleType');

const Vehicles = sequelize.define('Vehicles', {
 VID: {
  type: DataTypes.INTERGER,
  autoIncrement: true,
  primaryKey: true
 },

 VName: {
  type: DataTypes.STRING,
  allowNULL: false
 },

 VTypeID: {
  type: DataTypes.INTERGER,
  allowNULL: false
 }

}, { tableName: ' vehicle', timestamp: false });

Vehicles.belongsTo(VehicleType, { foreignKey: 'VTypeID' });

module.exports = Vehicles