const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const VehicleType = sequelize.define('VehicleType', {
 VTypeID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  field: 'vtypeid' // exact column name in DB
 },
 type_name: {
  type: DataTypes.STRING,
  allowNull: false,
  field: 'type_name'
 },
 wheels: {
  type: DataTypes.INTEGER,
  allowNull: false,
  field: 'wheels',
  validate: { isIn: [[2, 4]] }

 }
}, {
 tableName: 'vehicle_types',
 timestamps: false
});

module.exports = VehicleType;
