const express = require('express')
const { createChat, findChat, userChats } = require('../controllers/chatController');
const router = express.Router()

router.post('/create-chat', createChat);
router.get('/create-chat/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

module.exports = router