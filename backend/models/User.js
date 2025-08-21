const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
 userID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  field: 'userid'
 },

 first_name: {
  type: DataTypes.STRING,
  allowNull: false
 },

 last_name: {
  type: DataTypes.STRING,
  allowNull: false
 }

}, {
 tableName: 'users',
 timestamps: false
});

module.exports = User;
