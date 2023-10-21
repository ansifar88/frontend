// import { AddIcon } from "@chakra-ui/icons";
// import { Card, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
// import ChatLoading from "./ChatLoading";
// import { Button } from "@chakra-ui/react";
// import { axiosUserInstance } from "../../../../Constants/axios";
import userRequest from "../../../../utils/userRequest";
import { ChatState } from "./Context/ChatProvider";
// import { getSender } from "../Config/ChatLogistics";
import { Card, Spinner, Typography } from "@material-tailwind/react";

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
            const { data } = await userRequest.get(`/fetchchat/${userId}`, config);
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


    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, [fetchAgain]);

    return (
        <Card
            className={`${selectedChat ? 'hidden' : 'flex'
                } md:flex flex-col items-center p-3 bg-white w-full  md:w-1/3 rounded-lg border border-gray-200`}

        >
            <Card
                className="pb-3 px-3 font-work-sans text-28 md:text-30 flex w-full justify-between items-center"
            >
                My Chats
            </Card>
            <Card
                className="flex flex-col p-3 bg-gray-200 w-full h-full rounded-lg overflow-hidden"
            >
                {chats ? (
                    <Card className="overflow-y-scroll min-h-[20rem]">
                        {chats.map((chat) => (
                            <Card
                                onClick={() => setSelectedChat(chat)}
                                className={`cursor-pointer px-3 py-2 rounded-md
                                        ${selectedChat === chat
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-200 text-black'
                                    }`}
                                key={chat._id}
                            >
                                <Typography>
                                    {chat.users.doctor.name}
                                </Typography>
                                {chat.latestMessage && (
                                    <Typography fontSize="xs">
                                        <b>
                                            {chat.latestMessage.sender.doctor
                                                ? chat.latestMessage.sender.doctor.name
                                                : chat.latestMessage.sender.user.name}
                                            :
                                        </b>
                                        {chat.latestMessage.content.length > 50
                                            ? chat.latestMessage.content.substring(0, 51) + "..."
                                            : chat.latestMessage.content}
                                    </Typography>
                                )}
                            </Card>
                        ))}
                    </Card>
                ) : (
                    //   <ChatLoading />
                    <Spinner></Spinner>
                )}
            </Card>
        </Card>
    );
};

export default MyChats;
