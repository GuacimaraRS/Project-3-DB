const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Reservation = sequelize.define(
  'reservation',
  {
    day_event: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isDateValid(value) {
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(value)) {
                    throw new Error('Incorrect date. Use the format YYYYY-MM-DD.');
                }
            },
        },
    },
    hour_event: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isTimeFormat(value) {
                const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Formato HH:MM en 24 horas
                if (!timeRegex.test(value)) {
                    throw new Error('Ivalid time. Use the format HH:MM in 24 hours.');
                }
            },
        },
    }
},
{ timestamps: false }
)

module.exports = Reservation