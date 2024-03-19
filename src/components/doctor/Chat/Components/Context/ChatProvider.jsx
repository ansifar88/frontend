import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChatContext=createContext()

function ChatProvider({children}) {

  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const initialChatState = {
    _id: '', 
    chatName: '', 
    users: [], 
    createdAt: '',
    updatedAt: '', 
    // Add other properties as needed
  };
  const { doctorInfo } = useSelector(state => state.doctor)

  const navigate=useNavigate()
  useEffect(() => {
    // const doctorInfo = JSON.parse(localStorage.getItem("doctorInfo"));
    console.log(doctorInfo);
    setUser(doctorInfo);
    setUser(doctorInfo);
    setSelectedChat();

    if (!doctorInfo) navigate("/doctor/");
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const ChatState=()=>{
    return useContext(ChatContext)
}

export default ChatProvider