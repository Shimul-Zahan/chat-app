const express = require('express');
const chats = require('./data/data');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/userRoute')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

app.use(cors());
app.use(express.json());


app.get('/api', (req, res) => {
    res.json({ message: 'Server running well' });
})

app.get('/api/chat', (req, res) => {
    res.json(chats);
})

app.get('/api/chat/:id', (req, res) => {
    const id = req.params.id;
    const singleChat = chats.find((chat) => chat._id === id);
    res.json(singleChat);
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/messages', messageRoutes)


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.URL, { dbName: 'chatApp' });
        console.log('DB connect successfully');
    } catch (error) {
        console.log(error.message);
    }
}

app.listen(port, () => {
    connectDB();
    console.log('server runing well on 5000 port');
})