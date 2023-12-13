const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    getEventPack,
    createEvent,
    updateEvent,
    deleteEvent
 } = require('../controllers/event_controllers')


router.get('/:userId', getEventPack)
router.post('/', createEvent)
router.put('/:eventId',updateEvent)
router.delete('/:eventId',deleteEvent)


module.exports = router
