const router = require('express').Router()
const { checkAdmin, checkPhotoGrapher } = require("../middlewares/auth");

const { 
    getProfile,
    createUser,
    updateProfile,
    deleteProfile
 } = require('../controllers/contactInfoPhotographer_controllers')



router.get('/profile', checkPhotoGrapher, getProfile)
router.post('/', checkAdmin, createUser)
router.put('/profile', checkPhotoGrapher, updateProfile)
router.delete('/profile', checkPhotoGrapher, deleteProfile)


module.exports = router
