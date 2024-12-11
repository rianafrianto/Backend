const { Sequelize } = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];  // Pilih lingkungan yang sesuai

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false, 
  dialectModule: require('mysql2'),
});

module.exports = sequelize;
