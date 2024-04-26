import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Chat = () => {

    const [chats, setChats] = useState([]);

    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/api/chat/');
        setChats(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {
                chats && chats.map((chat, i) =>
                    <div key={i}>
                        <h1>{chat.chatName}</h1>
                    </div>
                )
            }
        </div>
    )
}

export default Chat