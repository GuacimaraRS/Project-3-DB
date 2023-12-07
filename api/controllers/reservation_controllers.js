const Reservation = require('../models/reservation_models')
const Pack = require('../models/pack_models')
const Event = require('../models/event_models')
const User = require('../models/user_models')

async function getAllReservation(req, res) {
	try {
		if (res.locals.user.role === 'client') {
			const reserclient = await Reservation.findAll({
				where: { id: res.locals.user.id },
				include: { model: Event, model: Pack }
			})
			return res.status(200).json(reserclient)
		}
		else if (res.locals.user.role ==='photographer') {
			const reserphotogra = await Reservation.findAll({
				where: { id: res.locals.user.id },
				include: { model: Event, model: Pack }
			})
			return res.status(200).json(reserphotogra)
		}
		else if (res.locals.user.role === 'admin') {
			const reseradmin = await Reservation.findAll({
				where: req.query,
				include: { model: Event, model: Pack }
			})
			return res.status(200).json(reseradmin)

		} else {
			return res.status(404).send('No reservation found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneReservation(req, res) {
	try {
			const reservation = await Reservation.findByPk(req.params.reservationId, {
			where: { id: res.locals.user.id },
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['name_user'],
				},
				{
					model: Pack,
					as: 'pack',
					attributes: ['name_pack'],
				},
				]
			})
		if (reservation) {
			return res.status(200).json({ message: `${reservation.user.name_user} has a reservation an Event and the Pack ${reservation.pack.name_pack} `, reservation })
		} else {
			return res.status(404).send('Reservation not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function bookReservation(req, res) {
	try {
		const { packId, eventId } = req.body
		const reservation = await Reservation.findByPk(req.params.packId)

		if (reservation) {
			if (appointment.status === 'available') {

				await reservation.addSchedule(treatmentIds)

				const treatments = await Treatment.findAll({
					 where: { id: treatmentIds } })
				const description = treatments.map(treatment => treatment.description).join(', ')

				await appointment.update({
					description,
					petId,
					status: 'not_available'
				})

				return res.status(200).json({ message: 'Appointment booked successfully' })
			} else {
				return res.status(409).send('Appointment is not available for booking')
			}
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function createAppointment(req, res) {
	try {
		const appointment = await Appointment.create({

			appointment_date: req.body.appointment_date,
			appointment_time: req.body.appointment_time,
			duration: req.body.duration
		})
		const user = await User.findByPk(req.params.vetId)
		await appointment.setUser(user)



		return res.status(200).json({ message: 'Appointment created', appointment: appointment })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateAppointment(req, res) {
	try {
		const [appointmentExist, appointment] = await Appointment.update(req.body, {
			returning: true,
			where: {
				id: req.params.appointmentId,
			},
		})
		if (appointmentExist !== 0) {
			return res.status(200).json({ message: 'Appointment updated', appointment: appointment })
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteAppointment(req, res) {
	try {
		const appointment = await Appointment.destroy({
			where: {
				id: req.params.appointmentId,
			},
		})
		if (appointment) {
			return res.status(200).json('Appointment deleted')
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllReservation,
    getOneReservation
}
