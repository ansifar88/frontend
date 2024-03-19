import { Stack, Text } from "@chakra-ui/layout";
import dp from "../../../../logos/dp.png"
import axios from "axios";
import { useEffect, useState } from "react";
import userRequest from "../../../../utils/userRequest";
import { ChatState } from "./Context/ChatProvider";
import { Spinner } from "@material-tailwind/react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SideDrawer from "./SideDrawer";

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const fetchChats = async () => {
        try {          
            console.log( selectedChat, "selected chat");
            const userId = user.id
            const { data } = await userRequest.get(`/fetchchat/${userId}`);
            console.log(data);
            setChats(data);
        } catch (error) {           
            console.log("Failed to Load the chats");
        }
    };

    const { userInfo } = useSelector((state) => state.user)
    useEffect(() => {
        setLoggedUser(userInfo);
        fetchChats();
    }, [fetchAgain]);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}

            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
            bg="#CAF0F8"
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
                bg="#CAF0F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"

            >
                {chats ? (
                    <Stack overflowY="hidden">
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#38B2AC" : "white"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                                display="flex"
                            >
                                <Box>
                                    
                                    <img src={chat.users.doctor ? chat.users.doctor.displaypicture : dp} className="h-10 w-10 me-3 rounded-full"/>
                                </Box>
                                <Box>
                                    <Text>
                                        {chat.users.doctor.name}
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
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <div className="flex justify-center items-center h-52">

                        <Spinner />
                    </div>
                    

                )}
            </Box>
        </Box>
    );
};

export default MyChats;
