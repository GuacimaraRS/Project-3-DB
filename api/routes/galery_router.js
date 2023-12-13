const router = require('express').Router()


const { 
  getOneGalery,
  getAllGalery,
   createGalery,
   updateGalery,
   deleteGalery
 } = require('../controllers/galery_controllers')

router.get('/:galeryId', getOneGalery)
router.get('/', getAllGalery)

router.post('/', createGalery)

router.put('/:galeryId', updateGalery)

router.delete('/:galeryId', deleteGalery)

module.exports = router
