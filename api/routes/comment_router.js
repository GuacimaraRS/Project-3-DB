const router = require('express').Router()
const { checkUser, checkAdmin } = require("../middlewares/auth");

const {   
    getAllComment,
    getCommentByMePhotographer,
    createComment,
    deleteComment
  
 } = require('../controllers/comments_controllers')



router.get('/profile',  getCommentByMePhotographer)
router.get('/:userId', getAllComment)

router.post('/:userId',checkUser, createComment)

router.delete('/:userId',checkAdmin, deleteComment)

module.exports = router
