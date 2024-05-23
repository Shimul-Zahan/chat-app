const MessageModel = require('../models/messageModel')
const path = require('path');
const multer = require('multer');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(__dirname, '..', '..', 'client', 'public', 'images');
        if (!destinationPath) {
            console.error('Error: Destination path is undefined');
            return cb(new Error('Destination path is undefined'));
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.replace(/\s+/g, '');
        if (!fileName) {
            console.error('Error: File name is undefined');
            return cb(new Error('File name is undefined'));
        }

        // Call the callback function with the fileName
        cb(null, fileName);
    }
});

const upload = multer({ storage });

const addMessage = async (req, res) => {
    console.log('his this route');
    const { recieverId, senderId, text } = req.body;
    // console.log(recieverId, senderId, req.file?.filename, text);

    const sender = await User.findById(senderId);
    const receiver = await User.findById(recieverId);
    const new_reciever = await User.findByIdAndUpdate(recieverId, {
        lastMessage: text?.message || text?.message,
        sender: sender.name,
        messageSendTime: new Date()
    }, { new: true });


    const new_sender = await User.findByIdAndUpdate(senderId, {
        lastMessage: text?.message || text?.message,
        sender: "me",
        messageSendTime: new Date()
    }, { new: true });

    const message = new MessageModel({
        senderId,
        recieverId,
        text: {
            message: text && text?.message,
            image: req.file?.filename && req.file?.filename
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
    const { recieverId, senderId } = req.params;
    console.log(recieverId, senderId);
    try {
        const result = await MessageModel.find({
            $or: [
                { recieverId, senderId },
                { recieverId: senderId, senderId: recieverId }
            ]
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { addMessage, getMessages, upload }