import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { cancelAppointment } from "../../api/userApi";
import { ToastContainer } from 'react-toastify';
import { GenerateError, GenerateSuccess } from '../../toast/GenerateError';
import { useQueryClient } from "@tanstack/react-query";
export function CancelBooking({id}) {
    
    const queryClient = useQueryClient()
const handleCancel =async ()=>{
    const response = await cancelAppointment({id})
    console.log(response);
    if(response.data.updated){
        GenerateSuccess(response.data.message)
        queryClient.invalidateQueries("appointmentsUser")
        setOpen(!open)
    }else{
        GenerateError(response.data.message)
        setOpen(!open)
    }
}
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button
                onClick={handleOpen}
                size="sm"
                className="my-1  bg-red-500 shadow-none "
                variant="filled"
            >
                cancel
            </Button>
            <Dialog open={open} handler={handleOpen} size="xs">
                
                <DialogBody className="flex flex-col justify-center items-center">

                   <Typography variant="h5"> Are You Sure </Typography>
                   <Typography variant="h6"> Cancel the Booking </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                        size="sm"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="filled" size="sm" color="green" onClick={handleCancel}>
                        <span>Yes</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer/>
        </>
    );
}