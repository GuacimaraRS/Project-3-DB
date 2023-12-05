const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Galery = sequelize.define(
    'galery',
    {
        type_category: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { timestamps: false }
)

module.exports = Galery