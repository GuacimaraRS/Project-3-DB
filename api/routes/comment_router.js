const router = require('express').Router()
const { checkUser, checkPhotoGrapher } = require("../middlewares/auth");

const {   
    getAllComment,
    getCommentByMePhotographer,
    createComment
  
 } = require('../controllers/comments_controllers')


router.get('/:userId', getAllComment)
router.get('/profile',  getCommentByMePhotographer)
router.post('/:userId',checkUser, createComment)

module.exports = router
