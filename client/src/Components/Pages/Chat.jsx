import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Message from './Message';
import { io } from 'socket.io-client'

const Chat = () => {

    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()

    console.log(onlineUsers);


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
        socket.current.emit('addActiveUser', userInfo._id);
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
            <div className='max-h-screen'>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 lg:gap-1">
                    <div className="h-screen rounded-lg  p-2">
                        <li className='p-2 mb-10 my-2 text-xl bg-red-500 font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                            <img src={userInfo?.image} alt="" className='w-12 h-12 rounded-full' />
                            <div className='text-white'>
                                <h1 className='text-base font-bold capitalize '>{userInfo?.name}</h1>
                                <p className='text-xs'>My Self</p>
                            </div>
                        </li>
                        {
                            allUsers && allUsers.map((chat, idx) =>
                                <li onClick={() => setReciever(chat)} key={idx} className='p-2 relative my-2 cursor-pointer hover:shadow-lg text-xl font-medium flex justify-start items-center gap-2 border border-black rounded-lg'>
                                    <img src={chat.image} alt="" className='w-12 h-12 rounded-full' />
                                    <div>
                                        <h1 className='text-base font-bold capitalize'>{chat.name}</h1>
                                        {onlineUsers.some(user => user.userId === chat._id) ? (
                                            <div className="flex items-center">
                                                <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-green-700 mr-2"></span>
                                                <p className="text-sm text-green-700">Online</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                                <p className="text-sm text-red-500">Offline</p>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            )
                        }
                    </div>
                    <div className="h-screen rounded-lg lg:col-span-4">
                        <Message socket={socket} reciever={reciever} currentUser={userInfo} onlineUsers={onlineUsers} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat