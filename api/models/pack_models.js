const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Pack = sequelize.define(
    'pack',
    {
        name_pack: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10000,
            },
        },
        price_reservation: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 10000,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    { timestamps: false }
)

module.exports = Pack