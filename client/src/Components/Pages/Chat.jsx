import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Message from './Message';
import { io } from 'socket.io-client'

const Chat = () => {

    const [users, setUsers] = useState([])
    const [reciever, setReciever] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(false);
    const socket = useRef()

    const userInfoForChatApp = localStorage.getItem('userInfoForChatApp');
    const userInfo = JSON.parse(userInfoForChatApp);

    console.log(sendMessage);


    const getUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/user/all-users');
        console.log(res.data);
        setUsers(res.data);
        setSendMessage(false);
    }

    useEffect(() => {
        // fetchData()
        getUsers()
    }, [sendMessage])

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
    const allUsers = users?.filter(user => user._id !== userInfo._id)

    return (
        <div>
            <div className='max-h-screen'>
                <div className="grid gap-2 grid-cols-5 lg:gap-1">
                    <div className="h-screen rounded-lg p-2 col-span-1">
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
                                        <div className='flex justify-between items-center w-[210px]'>
                                            <h1 className='text-base font-bold capitalize'>{chat.name}</h1>
                                            <p className="font-bold text-xs text-gray-600">{
                                                chat?.messageSendTime
                                                    ? new Date(chat?.messageSendTime).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })
                                                    : ''
                                            }</p>
                                        </div>
                                        {onlineUsers.some(user => user.userId === chat._id) ? (
                                            <div className="flex items-center">
                                                <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-green-700 mr-2"></span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <span className="absolute bottom-4 left-12 w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                            </div>
                                        )}
                                        <div className='flex justify-between w-full'>
                                            <div className='flex justify-start items-center gap-1'>
                                                <p className="text-xs text-black font-bold">{chat?.sender && chat?.sender + ' :'}</p>
                                                <p className="text-xs text-black">{chat?.lastMessage}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </div>
                    <div className="h-screen rounded-lg col-span-4">
                        <Message setSendMessage={setSendMessage} socket={socket} reciever={reciever} currentUser={userInfo} onlineUsers={onlineUsers} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat