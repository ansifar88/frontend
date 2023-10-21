import { ChatState } from "./Context/ChatProvider";
// import SingleChat from "../SingleChat";
// import '../style.css'
import { Card } from "@material-tailwind/react";
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Card
    className={`${
        selectedChat ? 'flex' : 'hidden'
      } md:flex items-center flex-col p-3 bg-white  md:w-68 rounded-lg border border-gray-200`}>
        <p>jfdghkjdfh</p>
    
      {/* <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
    </Card>
  );
};

export default Chatbox;
