const router = require('express').Router()
const { checkAuth } = require("../middlewares/auth");

router.use('/auth', require('./auth_router'))

router.use('/user',checkAuth, require('./user_routes'))
router.use('/photographer',checkAuth, require('./contactInfoPhotographer_routes'))
router.use('/reservation', checkAuth, require('./reservation_routes'))
router.use('/event',checkAuth, require('./event_router'))
router.use('/pack',checkAuth, require('./pack_router'))
router.use('/comment', checkAuth,require('./comment_router'))
router.use('/messages', checkAuth,require('./messages_router'))



module.exports = router