const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const VehicleType = require('./VehicleType');

const Vehicles = sequelize.define('Vehicles', {
 VID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  field: 'vid'
 },
 VName: {
  type: DataTypes.STRING,
  allowNull: false,
  field: 'vname'
 },
 VTypeID: {
  type: DataTypes.INTEGER,
  allowNull: false,
  field: 'vtypeid'
 }
}, {
 tableName: 'vehicle',
 timestamps: false
});

Vehicles.belongsTo(VehicleType, { foreignKey: 'VTypeID' });

module.exports = Vehicles;
