// import { AddIcon } from "@chakra-ui/icons";
// import { Card, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
// import ChatLoading from "./ChatLoading";
// import { Button } from "@chakra-ui/react";
// import { axiosUserInstance } from "../../../../Constants/axios";
import { ChatState } from "./Context/ChatProvider";
// import { getSender } from "../Config/ChatLogistics";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import doctorRequest from "../../../../utils/doctorRequest";
import SideDrawer from "./SideDrawer";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    //   const toast = useToast();

    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            console.log(selectedChat);
            const userId = user.id
            const { data } = await doctorRequest.get(`/fetchchat/${userId}`, config);
            console.log(data);
            setChats(data);
        } catch (error) {
            //   toast({
            //     title: "Error Occured!",
            //     description: "Failed to Load the chats",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom-left",
            //   });
            console.log("Failed to Load the chats");
        }
    };

    const { doctorInfo } = useSelector((state) => state.doctor)
    useEffect(() => {
        setLoggedUser(doctorInfo);
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                display="flex"
                w="100%"
                alignItems="center"
                justifyContent="space-around"
                >
                <Box
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    fontFamily="Work sans"
                    display="flex"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    My Chats
                </Box>
                <Box>
                    {user && <SideDrawer />}
                </Box>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {chats ? (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                className={`cursor-pointer px-3 py-2 rounded-lg
                                    ${selectedChat === chat
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-200 text-black'
                                    }`}
                                key={chat._id}
                            >
                                <Text>
                                    {chat.users.user.name}
                                </Text>
                                {chat.latestMessage && (
                                    <Text fontSize="xs">
                                        <b>
                                            {chat.latestMessage.sender.doctor
                                                ? chat.latestMessage.sender.doctor.name
                                                : chat.latestMessage.sender.user.name}
                                            :
                                        </b>
                                        {chat.latestMessage.content.length > 50
                                            ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    //   <ChatLoading />
                    <Spinner />
                )}
            </Box>
        </Box>
    );
};

export default MyChats;
