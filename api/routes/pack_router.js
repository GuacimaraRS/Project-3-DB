const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    createPack,
    updatePack,
    deletePack
 } = require('../controllers/pack_controllers')



router.post('/:eventId', createPack)
router.put('/:packId',updatePack)
router.delete('/:packId',deletePack)




module.exports = router
