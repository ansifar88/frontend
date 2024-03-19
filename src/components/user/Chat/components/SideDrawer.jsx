import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'

import {

    Drawer,
  
    Typography,
   
    Input,
 
  
    Card
} from '@material-tailwind/react';

import { ChatState } from "./Context/ChatProvider";

import userRequest from "../../../../utils/userRequest";

function SideDrawer() {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {
        setSelectedChat,
        user,

        chats,
        setChats,
    } = ChatState();

    const navigate = useNavigate();





    const handleSearch = async () => {
        if (!search) {
       
            console.log("Please Enter something in search");
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await userRequest.get(`/usersearch?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
         
            console.log("somthing went wrong");
        }
    };

    const accessChat = async (doctorId) => {
     
        try {
            setLoadingChat(true);
       
            const userId = user.id
            const { data } = await userRequest.post(`/accesschat`, { doctorId, userId });
            console.log(data);

            if (!chats.find((c) => c._id === data._id)) {
                console.log('nothing');
                setChats([data, ...chats])
            }
            console.log(data, 'data');
            console.log(chats, 'chat');
            setSelectedChat(data);
            setLoadingChat(false);
            // onClose();
            setOpen(!open)
        } catch (error) {
        
            console.log("Error fetching the chat")
        }
    };

    return (
        <>

            <>
            <div onClick={openDrawer} className="flex bg-blue-gray-400 p-1 rounded-3xl cursor-pointer" >
                <Typography className="mx-3 ">search</Typography>
                <MagnifyingGlassIcon className="h-6 w-6 me-3"/>
            </div>
                <Drawer open={open} onClose={closeDrawer}>
                    <div className='p-5 flex items-center'>


                        <Input
                            className=""
                            label="Search by name or email:"
                            type="text"
                            variant="outlined"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div onClick={handleSearch} className="ms-2"><MagnifyingGlassIcon className="h-9 w-9 rounded-md cursor-pointer text-white bg-blue-800 p-2"/></div>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>
                            {searchResult?.map((user) => (
                                <Card key={user._id} onClick={() => accessChat(user._id)} className="cursor-pointer bg-blue-800 flex justify-center items-center rounded-md h-10 hover:bg-blue-700 m-2">
                                    <Typography className="text-white" >
                                        {user.name}
                                    </Typography >
                                </Card>
                            ))}
                        </div>
                    )}
                    {loadingChat && <div>Loading chat...</div>}
                </Drawer>
            </>
        </>
    );
}

export default SideDrawer;
