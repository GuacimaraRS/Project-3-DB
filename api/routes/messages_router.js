const router = require('express').Router()
const { checkUser, checkAdmin } = require("../middlewares/auth");

const {   
    getAllMessages,
    createMessages,
    answerMessage,
    deleteMessages
  
 } = require('../controllers/messages_controllers');



router.get('/', getAllMessages)

router.post('/answer/:messageId', answerMessage)
router.post('/:userId', createMessages)


router.delete('/:messageId',checkAdmin, deleteMessages)



module.exports = router
