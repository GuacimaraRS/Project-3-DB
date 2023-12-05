const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
    'user',
    {
        name_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 15]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['admin', 'photographer', 'client']],
                    msg: 'Valid role only admin, photographer or client',
                },
            },
        },
    },
    { timestamps: false }
)

module.exports = User