import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Message from './Message';
import { io } from 'socket.io-client'

const Chat = () => {

    const [clickUser, setClickUser] = useState('');
    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null);
    const [recivedMessage, setRecivedMessage] = useState(null);
    const socket = useRef()


    const userInfoForChatApp = localStorage.getItem('userInfoForChatApp');
    const userInfo = JSON.parse(userInfoForChatApp);


    const getUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/user/all-users');
        setUsers(res.data);
    }

    useEffect(() => {
        socket.current = io('ws://localhost:8000');
    }, [])

    // socket e data pathabo
    useEffect(() => {
        socket.current.emit('addActiveUser', userInfo, users);
    }, [])

    // get active user
    useEffect(() => {
        socket.current.on('getActiveUser', (activeUsers) => {
            setOnlineUsers(activeUsers);
        });
    }, [])


    const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000/api/chat/create-chat/${userInfo}`);
        setChats(res.data)
    }

    useEffect(() => {
        fetchData()
        getUsers()
    }, [])

    const allUsers = users?.filter(user => user._id !== userInfo._id)

    return (
        <div>
            <h1 className='bg-black text-white py-5 text-center text-3xl'>Chat Page</h1>
            <div>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 lg:gap-1">
                    <div className="h-screen rounded-lg  p-2">
                        <li className='p-2 mb-10 my-2 text-xl bg-red-500 font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                            <img src={userInfo?.image} alt="" className='w-12 h-12 rounded-full' />
                            <div>
                                <h1 className='text-base font-bold capitalize'>{userInfo?.name}</h1>
                                <p className='text-xs'>My Self</p>
                            </div>
                        </li>
                        {
                            allUsers && allUsers.map((chat, idx) =>
                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                    <img src={chat.image} alt="" className='w-12 h-12 rounded-full' />
                                    <div>
                                        <h1 className='text-base font-bold capitalize'>{chat.name}</h1>
                                        <p className='text-xs text-green-600'>Online</p>
                                    </div>
                                </li>
                            )
                        }
                    </div>
                    <div className="h-screen rounded-lg bg-gray-200 lg:col-span-4">
                        <Message socket={socket} reciever={reciever} currentUser={userInfo} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat