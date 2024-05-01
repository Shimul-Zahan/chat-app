import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as timeago from 'timeago.js';
import InputEmoji from "react-input-emoji";

const Message = ({ currentUser, reciever, socket }) => {

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [hasMessages, setHasMessages] = useState(false);
  const [image, setImage] = useState('');

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


  const sendMessage = async () => {
    try {
      socket.current.emit('send-message', {
        senderId: currentUser._id,
        recieverId: reciever._id,
        text: {
          message: newMessage,
          image: image,
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

  console.log(messages);

  return (
    <div className='p-4 h-screen overflow-y-scroll'>
      <div className='shadow-lg rounded-xl flex justify-between items-center'>
        <div className='p-2 text-xl font-medium flex justify-start items-center gap-2 rounded-lg'>
          <img src={reciever?.image} alt="" className='w-12 h-12 rounded-full' />
          <div>
            <h1 className='text-base font-bold'>{reciever?.name}</h1>
            <p className='text-xs'>Online</p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-10 pr-10'>
          <button className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Conditional rendering based on message availability */}
      {hasMessages ? (
        <div className="flex flex-col space-y-2 py-5">
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
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Tap to start conversation</p>
        </div>
      )}

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
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-10">
              <Picker onSelect={handleEmojiSelect} />
            </div>
          )}
        </div>
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


