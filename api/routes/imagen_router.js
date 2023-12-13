const router = require('express').Router()


const { 
  getAllImagen,
  getOneImagen,
  createImagen,
  updateImagen,
  deleteImagen
 } = require('../controllers/imagen_controllers')

router.get('/:imagenId', getOneImagen)
router.get('/', getAllImagen)

router.post('/:galeryId', createImagen)

router.put('/:imagenId', updateImagen)

router.delete('/:imagenId', deleteImagen)

module.exports = router
