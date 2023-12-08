const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    createEvent
 } = require('../controllers/event_controllers')



router.post('/', createEvent)


module.exports = router
