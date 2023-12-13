const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Image = sequelize.define(
  'images',
  {
    title_image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  { timestamps: false }
)

module.exports = Image