const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const PhotographerProfile = sequelize.define(
    'photographer',
    {
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        service: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        social_Media: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bizum_NCuenta: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 15]
            }
        },
    },
    { timestamps: false }
)

module.exports = PhotographerProfile