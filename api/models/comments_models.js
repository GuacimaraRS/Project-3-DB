const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Comment = sequelize.define(
    'comment',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 300],
            },
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        authId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }
)

module.exports = Comment