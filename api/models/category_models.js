const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Category = sequelize.define(
  'category',
  {
    title_Category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false }
)

module.exports = Category