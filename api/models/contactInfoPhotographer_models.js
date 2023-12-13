const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const PhotographerProfile = sequelize.define(
    'infoPhotoGrapher',
    {
        address: {
            type: DataTypes.STRING
        },
        service: {
            type: DataTypes.STRING
        },
        social_Media: {
            type: DataTypes.STRING
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