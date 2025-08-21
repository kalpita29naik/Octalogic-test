const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const VehicleType = sequelize.define('VehicleType', {
 VTypeID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },
 type_name: {
  type: DataTypes.STRING,
  allowNull: false
 },
 wheels: {
  type: DataTypes.INTEGER,
  allowNull: false
 }
}, {
 tableName: 'vehicle_types',
 timestamps: false
});

module.exports = VehicleType;
