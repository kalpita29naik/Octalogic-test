import { DataType } from 'Sequelize'
const sequelize = require('../db');

const VehicleType = sequelize.define('VehicleType', {
 VTypeID: {
  type: DataType.INTERGER,
  primaryKey: true,
  autoIncrement: true
 },
 type_name: {
  type: DataType.STRING,
  allowNULL: false
 },
 wheels: {
  type: DataType.INTERGER,
  allowNULL: false
 }

}, { tableName: 'vehicle_types', timestamp: false });

module.exports = VehicleType;