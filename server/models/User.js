const mongoose = require('mongoose');


const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        lastMessage: {
            type: String,
            default: null, 
        },
        sender: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userModel);
module.exports = User;