const router = require('express').Router()
const { checkAdmin } = require("../middlewares/auth");

const { 
    getAllUsers, 
    getOwnProfile,
    getAllPhotographer,
    getOnePhotographer, 
    createUser, 
    updateOneUser,
    updateProfile,
    deleteUser,
    deleteOwner,
} = require('../controllers/user_controllers')



router.get('/user',checkAdmin, getAllUsers)
router.get('/user/profile', getOwnProfile)
router.get('/user/contactInfoPhotographer', getAllPhotographer)
router.get('/user/:idUser', getOnePhotographer)
router.post('/user',checkAdmin, createUser)
router.put('/user/:idUser', checkAdmin, updateOneUser)
router.put('/user/profile', updateProfile)
router.delete('/user/:userId',checkAdmin, deleteUser)
router.delete('/user/profile', deleteOwner)


module.exports = router
