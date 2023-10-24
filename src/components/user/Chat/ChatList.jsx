import { useState } from "react";
import { ChatState } from "./components/Context/ChatProvider";
import SideDrawer from "./components/SideDrawer";
import MyChats from "./components/MyChats";
import Chatbox from "./components/Chatbox";
import { Box } from "@chakra-ui/react";
import './ChatList.css'
const ChatList = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div className="container mx-auto">
            <div style={{ width: "100%" }}>
           
            <Box  w="100%" h="91.5vh" p="10px" className="flex justify-between p-5">
                
                {user && <MyChats fetchAgain={fetchAgain}  />}
                {user && (
                    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} className="flex h-9" />
                )}
            </Box>
        </div>
        </div>
    );
};

export default ChatList;
