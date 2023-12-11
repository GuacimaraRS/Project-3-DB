const Reservation = require('../models/reservation_models')
const Pack = require('../models/pack_models')
const Event = require('../models/event_models')
const User = require('../models/user_models')

async function getAllReservation(req, res) {
	try {
		if (res.locals.user.role === 'client') {
			const reserclient = await Reservation.findAll({
				where: { clientId: res.locals.user.id },
				include: { model: Event, model: Pack }
			})
			return res.status(200).json(reserclient)
		}
		else if (res.locals.user.role ==='photographer') {
			const reserphotogra = await Reservation.findAll({
				where: { photographerId: res.locals.user.id },
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

async function createReservation(req, res) {
	try {
		
		if(res.locals.user.role === "photographer"){
			const user = await User.findByPk(res.locals.user.id)
			const reservation = await Reservation.create({
				day_event: req.body.day_event,
				hour_event: req.body.hour_event,
				packId: req.params.packId,
				photographerId: user.id
			})
			return res.status(200).json({
				message: 'Reservation created',
				reservation: reservation
				})
		}else if (res.locals.user.role === "client"){
			const user = await User.findByPk(res.locals.user.id)
			const reservation = await Reservation.create({
				day_event: req.body.day_event,
				hour_event: req.body.hour_event,
				packId: req.params.packId,
				clientId: user.id,
			})
			return res.status(200).json({
				message: 'Reservation created',
				reservation: reservation
				})
			
		
		}else{//seria el admin
			
			const clientId = await User.findByPk(req.body,{
				where:{
					clientId: req.body.userId,
				}
			})
			const photographerId = await User.findByPk(req.body,{
				where:{
					photographerId: req.body.userId,
				}
			})

			if(clientId){
				const reservation = await Reservation.create({
				day_event: req.body.day_event,
				hour_event: req.body.hour_event,
				packId: req.params.packId,
				clientId: clientId,
			})
			return res.status(200).json({
				message: 'Reservation created',
				reservation: reservation
				})
			}else if(photographerId){
				const reservation = await Reservation.create({
					day_event: req.body.day_event,
					hour_event: req.body.hour_event,
					packId: req.params.packId,
					photographerId: photographerId
				})
				return res.status(200).json({
					message: 'Reservation created',
					reservation: reservation
					})
			}
			
		}
		} catch (error) {
			res.status(500).send(error.message)
	}
}

async function createReservationByAdmin(req, res) {
	try {
			const user = await User.findByPk(res.locals.user.id)
			const reservation = await Reservation.create({
				day_event: req.body.day_event,
				hour_event: req.body.hour_event,
				packId: req.params.packId,
				photographerId: user.id
			})
			return res.status(200).json({
				message: 'Reservation created',
				reservation: reservation
				})
		
		} catch (error) {
			res.status(500).send(error.message)
	}
}

async function updateReservation(req, res) {
	try {
		const [reservationExist, reservation] = await Reservation.update(
			{
				day_event: req.body.day_event,
				hour_event: req.body.hour_event,
			}, {
			returning: true,
			where: {
				id: req.params.reservationId,
			},
		})
		if (reservationExist !== 0) {
			return res.status(200).json({ message: 'Reservation updated', reservation: reservation })
		} else {
			return res.status(404).send('Reservation not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteReservation(req, res) {
	try {
		if (res.locals.user.role === 'client') {
			const reserclient = await Reservation.findOne(
				{
					where: {
						clientId: res.locals.user.id,
						id: req.params.reservationId,
					},
				})
			await reserclient.destroy()
			return res.status(200).json(` Reservation deleted`)
		} else if (res.locals.user.role === 'photographer') {
			const reserphotographer = await Reservation.findOne(
				{
					where: {
						photographerId: res.locals.user.id,
						id: req.params.reservationId,
					},
				})
			await reserphotographer.destroy()
			return res.status(200).json(` Reservation deleted`)

		} else {
			return res.status(404).send('Reservation not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}
async function deleteReservationByAdmin(req, res) {
	try {
		const reservation = await Reservation.destroy({
			where: {
				id: req.params.reservationId,
			},
		})
		if (reservation) {
			return res.status(200).json('Reservation deleted')
		} else {
			return res.status(404).send('Reservation not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllReservation,
    getOneReservation,
	createReservation,
	updateReservation,
	deleteReservation,
	deleteReservationByAdmin
}
