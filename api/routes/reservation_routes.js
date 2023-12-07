const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
   getAllReservation,
   getOneReservation,

 } = require('../controllers/reservation_controllers')



router.get('/', getAllReservation)
router.get('/:reservationId', checkAdmin, getOneReservation)




module.exports = router
