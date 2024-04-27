import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Message from './Message';

const Chat = () => {

    const [chats, setChats] = useState([]);
    const [user, setUser] = useState();
    const [chat, setChat] = useState();

    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/api/chat/create-chat/662a962d3ceb954ffb6b50c7');
        setChats(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(user);

    // getting user
    const fetchDataOfUser = async () => {
        try {
            for (const chat of chats) {
                const foundUserId = chat.members.find(id => id !== '662a962d3ceb954ffb6b50c7');
                const res = await axios.get(`http://localhost:5000/api/user/${foundUserId}`);
                // setUser(prevUser => ({ ...prevUser, [foundUserId]: res.data }));
                setUser(res.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchDataOfUser();
    }, [chats]);

    console.log(chat);

    return (
        <div>
            <h1 className='bg-black text-white py-5 text-center text-3xl'>Chat Page</h1>
            <div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 lg:gap-1">
                    <div className="h-screen rounded-lg bg-gray-200 p-2">
                        {
                            chats && chats.map((chat, idx) =>
                                <li onClick={() => setChat(chat)} key={idx} className='p-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                    <img src={user?.image} alt="" className='w-12 h-12 rounded-full' />
                                    <div>
                                        <h1 className='text-base font-bold'>{user?.name}</h1>
                                        <p className='text-xs'>Online</p>
                                    </div>
                                </li>
                            )
                        }
                    </div>
                    <div className="h-screen rounded-lg bg-gray-200 lg:col-span-4">
                        <Message data={chat} reciever={user} currentUser={'662a962d3ceb954ffb6b50c7'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat