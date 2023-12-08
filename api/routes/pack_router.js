const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    createPack
 } = require('../controllers/pack_controllers')


router.post('/:eventId', createPack)


module.exports = router
