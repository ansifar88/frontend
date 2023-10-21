import { useState } from "react";
import { ChatState } from "./components/Context/ChatProvider";
import { Card } from "@material-tailwind/react";
import SideDrawer from "./components/SideDrawer";
import MyChats from "./components/MyChats";
import Chatbox from "./components/Chatbox";
// import Chatbox from "./Components/Chatbox";

const ChatList = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div className="container mx-auto">
            {user && <SideDrawer />}
            <Card className="flex justify-between w-full h-[91.5vh] ">
                
                {user && <MyChats fetchAgain={fetchAgain} className="flex h-9" />}
                {user && (
                    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} className="flex h-9" />



                )}
            </Card>
        </div>
    );
};

export default ChatList;
