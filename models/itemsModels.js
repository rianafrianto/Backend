const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,  // Secara otomatis menambahkan createdAt dan updatedAt
  paranoid: true,    // Mengaktifkan soft delete dan menambahkan deletedAt
  createdAt: 'created_at',  // Update nama kolom
  updatedAt: 'updated_at',  
  deletedAt: 'deleted_at', 
});

module.exports = Item;
