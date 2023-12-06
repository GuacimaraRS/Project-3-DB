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


router.get('/profile', getOwnProfile)
router.get('/photographers', getAllPhotographer)
router.get('/:userId', getOnePhotographer)
router.get('/',checkAdmin, getAllUsers)
router.post('/',checkAdmin, createUser)
router.put('/profile', updateProfile)
router.put('/:userId', checkAdmin, updateOneUser)
router.delete('/profile', deleteOwner)
router.delete('/:userId',checkAdmin, deleteUser)



module.exports = router
