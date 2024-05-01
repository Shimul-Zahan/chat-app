const MessageModel = require('../models/messageModel')

const addMessage = async (req, res) => {
    const { recieverId, senderId, text } = req.body;
    console.log(text);
    const message = new MessageModel({
        senderId,
        recieverId,
        text: {
            message: text.message,
            image: text.image
        }
    });
    try {
        const result = await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await MessageModel.find({ chatId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { addMessage, getMessages }