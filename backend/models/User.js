import { Sequelize, DataTypes } from 'sequelize';
const sequelize = require("../db");

const User = sequelize.define('User', {
 UserID: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
 },

 first_name: {
  type: DataTypes.STRING,
  allowNULL: false,
 },

 last_name: {
  type: DataTypes.STRING,
  allowNULL: false,
 }
}, { tableName: 'users', timestamps: false });

module.exports = User;