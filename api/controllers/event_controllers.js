const { where } = require('sequelize')
const Event = require('../models/event_models')
const Pack  = require('../models/pack_models')


async function getEventPack(req, res) {
	try {
        
		const event = await Event.findAll({
           where: {
                userId: req.params.userId
            },
            include: [Pack]
        })
       
		if (event) {
			return res.status(200).json({message: event})
		} else {
			return res.status(404).send('Pack not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createEvent(req, res) {
    try {
        if (res.locals.user.role !== "client") {
            const user =res.locals.user.id
            const event = await Event.create(req.body)
            await event.setUser(user)

            if (event) {
                return res.status(200).json({
                    message: 'Event created',
                    event: event
                })
            } else
                return res.status(404).send('Event NO created')
        } else
            return res.status(404).send('User not authorization')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateEvent(req, res) {
    try {
        if(res.locals.user.role !== "client"){ 
            const [eventExist] = await Event.update(req.body,
                {
                    where: { id: req.params.eventId }
                })

            if (eventExist !== 0) {
                return res.status(200).json({ message: 'Event updated' })
            } else {
                return res.status(404).send('Event not found')
            }}else
            return res.status(404).send('User not authorization')
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteEvent(req, res) {
	try {

		if(res.locals.user.role !== "client"){ 
            const deleteEvent = await Event.findOne(
                {
                    where: {
                        id: req.params.eventId
                    }
                })
            const deletePack = await Pack.findOne({
                where:{
                    eventId: req.params.eventId
                }
            })
            await deleteEvent.destroy()
            await deletePack.destroy()
                return res.status(200).json({
                    message: 'Event deleted',
                    event: deleteEvent, deletePack
                })
           
        }else
            return res.status(404).send('User not authorization')
	} catch (error) {
		return res.status(500).send(error.message)
    }
}



module.exports = {
    getEventPack,
    createEvent,
    updateEvent,
    deleteEvent
}