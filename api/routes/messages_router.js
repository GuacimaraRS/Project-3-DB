const router = require('express').Router()
const { checkUser, checkAdmin } = require("../middlewares/auth");

const {   
    getAllMessages,
    createMessages,
    deleteMessages
  
 } = require('../controllers/messages_controllers');



router.get('/', getAllMessages)

router.post('/:userId', createMessages)

router.delete('/:messageId',checkAdmin, deleteMessages)



module.exports = router
