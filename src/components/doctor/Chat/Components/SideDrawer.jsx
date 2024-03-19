

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import {
    Drawer,
    Typography,
    Input,
    List,
    ListItem
} from '@material-tailwind/react';

import { ChatState } from "./Context/ChatProvider";
import userRequest from "../../../../utils/userRequest";
import doctorRequest from "../../../../utils/doctorRequest";

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
    console.log(user, "doctor");
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

            const { data } = await doctorRequest.get(`/usersearch?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {

            console.log("somthing went wrong");
        }
    };

    const accessChat = async (userId) => {
        console.log(userId);

        try {
            setLoadingChat(true);

            const doctorId = user.id
            const { data } = await userRequest.post(`/accesschat`, { doctorId, userId },);
            console.log(data);

            if (!chats.find((c) => c._id === data._id)) {
                console.log('nothing');
                setChats([data, ...chats])
            }
            console.log(data, 'data');
            console.log(chats, 'chat');
            setSelectedChat(data);
            setLoadingChat(false);
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
                    <MagnifyingGlassIcon className="h-6 w-6 me-3" />
                </div>
                <Drawer open={open} onClose={closeDrawer}>
                    <div className='p-5 flex items-center'>


                        <Input
                            className=""
                            label="Search by name or email:"
                            type="text"
                            variant="standard"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div className="ms-2" onClick={handleSearch}><MagnifyingGlassIcon className="h-9 w-9 rounded-md cursor-pointer text-white bg-blue-gray-400 p-2"/></div>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <List>
                            {searchResult?.map((user) => (
                                <ListItem onClick={() => accessChat(user._id)} key={user._id}>

                                    {user.name}

                                </ListItem>
                            ))}
                        </List>
                    )}
                    {loadingChat && <div>Loading chat...</div>}
                </Drawer>
            </>
        </>
    );
}

export default SideDrawer;
