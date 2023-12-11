const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    getEventPack,
    createEvent
 } = require('../controllers/event_controllers')


 router.get('/:userId', getEventPack)
router.post('/', createEvent)


module.exports = router
