import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import * as timeago from 'timeago.js';
import InputEmoji from "react-input-emoji";
import { MdOutlineWifiCalling } from "react-icons/md";
import { MdOutlineVideoCall } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegImage } from "react-icons/fa6";


const Message = ({ currentUser, reciever, socket, onlineUsers }) => {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [hasMessages, setHasMessages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  // State to track if there are messages
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/message/${reciever._id}/${currentUser?._id}`);
      setMessages(res.data);
      setHasMessages(res.data.length > 0); // Update hasMessages state based on message data
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  // Listen for incoming messages from Socket.io
  useEffect(() => {
    socket.current?.on('receive-message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
  }, [socket]);


  useEffect(() => {
    fetchData();
  }, [reciever])

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const sendMessage = async () => {
    try {
      socket.current.emit('send-message', {
        senderId: currentUser._id,
        recieverId: reciever._id,
        text: {
          message: newMessage,
          image: sel,
        },
        time: new Date(),
      })
      await axios.post('http://localhost:5000/api/messages/message', {
        senderId: currentUser._id,
        recieverId: reciever._id,
        text: {
          message: newMessage,
          image: image,
        }
      });
      fetchData();
      setNewMessage('');
      console.log('message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }


  const handleEmojiSelect = (emoji) => {
    setInputMessage(inputMessage + emoji.native);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // Handle image upload here, e.g., send it to the server or display a preview
  };


  return (
    <div className='p-4 flex flex-col h-screen '>
      <div className='shadow-lg rounded-xl flex justify-between items-center'>
        <div className='p-2 text-xl relative font-medium flex justify-start items-center gap-2 rounded-lg'>
          <img src={reciever?.image} alt="" className='w-12 h-12 rounded-full' />
          <div className='text-white ml-2'>
            <h1 className='text-base font-bold'>{reciever?.name}</h1>
            {onlineUsers.some(user => user.userId === reciever._id) ? (
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
        </div>
        <div className='flex justify-center items-center gap-5 pr-10'>
          <button className='cursor-pointer'>
            <MdOutlineWifiCalling className='text-xl font-bold' />
          </button>
          <button className='cursor-pointer'>
            <MdOutlineVideoCall className='text-2xl font-bold' />
          </button>
          <button className='cursor-pointer'>
            <HiDotsVertical className='text-xl font-bold' />
          </button>
        </div>
      </div>

      <div className='overflow-y-auto flex-grow'>
        {/* Conditional rendering based on message availability */}
        {hasMessages ? (
          <div className="flex flex-col space-y-2 py-5 overflow-y-scroll">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`${message.senderId === currentUser._id ? "self-end bg-blue-500 text-white" : "self-start bg-blue-400"
                  } p-4 rounded-lg max-w-xs`}
              >
                <p className="text-sm">{message?.text?.message}</p>
                <p className="text-xs text-gray-600 text-end">{timeago.format(message.createdAt)}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">Tap to start conversation</p>
          </div>
        )}
      </div>

      {/* for sending message */}
      <div className="flex items-center justify-between mt-4">
        <button className='text-2xl font-bold px-8'>+</button>
        <div className="relative w-full">
          <InputEmoji
            value={newMessage}
            onChange={setNewMessage}
            cleanOnEnter
            placeholder="Type a message"
          />
          <button className='absolute right-16 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 rounded-full w-10 h-10'>
            <input type="file" name="" id="" className="hidden" />
            <FaRegImage className='text-lg' />
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-10">
              <Picker onSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
        <button className='absolute right-16 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gray-200 rounded-full w-10 h-10'>
          <label htmlFor="imageUpload" className="cursor-pointer">
            <input
              id="imageUpload"
              type="file"
              name="imageUpload"
              className="hidden"
              onChange={handleImageChange}
            />
            <FaRegImage className='text-lg' />
          </label>
        </button>
        <button
          onClick={sendMessage}
          className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Message;


