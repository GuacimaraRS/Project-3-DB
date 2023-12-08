const Event = require('../models/event_models')

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

module.exports = {
    createEvent
}