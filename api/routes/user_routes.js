const router = require('express').Router()
const { checkAdmin,checkUser} = require("../middlewares/auth");

const { 
    getAllUsers, 
    getProfile,
    getAllPhotographer,
    getOnePhotographer, 
    createUser, 
    updateOneUser,
    updateProfile,
    deleteUser,
    deleteOwner,
} = require('../controllers/user_controllers')


router.get('/profile',checkUser, getProfile)
router.get('/adminProfile',checkAdmin, getProfile)
router.get('/photographers', getAllPhotographer)
router.get('/:userId',checkUser, getOnePhotographer)
router.get('/',checkAdmin, getAllUsers)
router.post('/',checkAdmin, createUser)
router.put('/profile', checkUser, updateProfile)
router.put('/:userId', checkAdmin, updateOneUser)
router.delete('/profile', deleteOwner)
router.delete('/:userId',checkAdmin, deleteUser)



module.exports = router
