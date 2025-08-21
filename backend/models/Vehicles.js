const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const VehicleType = require('./VehicleType');

const Vehicles = sequelize.define('Vehicles', {
 VID: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
 },
 VName: {
  type: DataTypes.STRING,
  allowNull: false
 },
 VTypeID: {
  type: DataTypes.INTEGER,
  allowNull: false
 }
}, {
 tableName: 'vehicle',
 timestamps: false
});

Vehicles.belongsTo(VehicleType, { foreignKey: 'VTypeID' });

module.exports = Vehicles;
