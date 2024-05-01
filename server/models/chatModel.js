const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {
        timestamps: true,
    }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;