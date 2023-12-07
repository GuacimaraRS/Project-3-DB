const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    getProfile,
    updateProfile,
    deleteProfile
 } = require('../controllers/contactInfoPhotographer_controllers')



router.get('/profile', checkPhotoGrapher, getProfile)

router.put('/profile', checkPhotoGrapher, updateProfile)

router.delete('/profile', checkPhotoGrapher, deleteProfile)


module.exports = router
