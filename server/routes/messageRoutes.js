const express = require('express')
const { addMessage, getMessages, upload } = require('../controllers/messageControllers');

const router = express.Router();

router.post('/message', upload.single('image'), addMessage);
router.get('/message/:recieverId/:senderId', getMessages);

module.exports = router