const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Menjamin email tidak duplikat
        validate: {
            isEmail: true,  // Memastikan email mengikuti format yang benar
        },
    },
}, {
    timestamps: true,   // Menambahkan created_at dan updated_at secara otomatis
    createdAt: 'created_at',  // Update nama kolom
    updatedAt: 'updated_at', 
});

module.exports = User;
