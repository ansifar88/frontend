import { ChatState } from "./components/Context/ChatProvider";
import { Box, FormControl, IconButton, Spinner, Text } from '@chakra-ui/react';
import { Input } from "@chakra-ui/input";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import io from "socket.io-client";
import userRequest from '../../../utils/userRequest';
import animationData from './typing.json'
import { useEffect } from 'react';
import ScrollableChat from './components/ScrollableChat';
var socket, selectedChatCompare;
const ENDPOINT = import.meta.env.VITE_BACKENDURL;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();
  console.log(selectedChat, "now");
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {

      setLoading(true);
      console.log(selectedChat);
      const { data } = await userRequest.get(
        `/message/${selectedChat._id}`,

      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {

      console.log("Failed to Load the Messages");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {

      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await userRequest.post(
          "/message",
          {
            content: newMessage,
            chatId: selectedChat,
            userId: user.id,
          },
          config
        );
        console.log(user);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {

        console.log("Failed to send the Message");
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

  }, []);


  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;

  }, [selectedChat]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageReceived) => {
      console.log('New message received:', newMessageReceived);
      console.log('Selected chat compare:', selectedChatCompare);

      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    };

    socket.on("message received", handleNewMessageReceived);

    return () => {
      socket.off("message received", handleNewMessageReceived);
    };
  }, [selectedChatCompare, notification, fetchAgain, messages])

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };


  const isMessageSender = (currentUser, selectedChat) => {
    return (
      selectedChat.sender && currentUser.user.id === selectedChat.sender.id
    );
  };
  return (
    <>
      {
        selectedChat ? (
          <>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              display="flex"
              justifyContent={{ base: "start" }}
              alignItems="center"
              bg="#CAF0F8"
            >
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              <img src={selectedChat.users.doctor && selectedChat.users.doctor.displaypicture} className='h-10 w-10 rounded-full me-2' />

              {selectedChat.users.doctor && selectedChat.users.doctor.name}
            </Text>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={3}
              bg="#E8E8E8"
              w="100%"
              h="90%"
              borderRadius="lg"
              overflowY="hidden"
            >
              {loading ? (
                <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
              ) : (
                <div className="messages overflow-hidden">

                  <ScrollableChat messages={messages} user={user} />
                </div>
              )}
              {istyping && !isMessageSender(user, selectedChat) ? ( // Check if sender is not the current user
                <div>
                  <p style={{ marginBottom: 8, marginLeft: 0, color: "gray" }}>
                    Typing...
                  </p>
                </div>
              ) : (
                <></>
              )}
              <FormControl className="w-full pt-3" id="first-name" isRequired >
                <div className="relative flex w-full">
                  <Input
                    className="w-full h-8 "
                    borderRadius={10}
                    variant="outline"

                    bg="#E0E00"
                    placeholder="   Enter a message..."
                    value={newMessage}
                    onChange={typingHandler}
                    onKeyDown={sendMessage}
                  />

                </div>
              </FormControl>
            </Box>
          </>
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
              Click on a user to start chatting
            </Text>
          </Box>
        )
      }
    </>
  )
}

export default SingleChat
