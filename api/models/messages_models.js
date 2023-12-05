const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Message = sequelize.define(
    'message',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 300],
            },
        },
    },
    { timestamps: false }
)

module.exports = Message