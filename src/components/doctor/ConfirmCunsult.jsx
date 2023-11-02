import React from "react";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { NoSymbolIcon } from "@heroicons/react/24/solid";

import { useQueryClient } from "@tanstack/react-query";
import { confirmCunsult } from "../../api/doctorApi";


export function ConfirmCunsult({ id }) {
    console.log(id, "confirm");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const queryClient = useQueryClient()
    const handleAction = async () => {
        const res = await confirmCunsult(id)
        if (res) {
            handleOpen()
        }
    }
    return (
        <>

            <Button
                size="sm"
                className="my-1 flex items-center gap-3 bg-green-500 shadow-none me-2"
                variant="filled"
                onClick={handleOpen}

            >
                cunsulted</Button>
            <Dialog open={open} size="xs" className="rounded-none" handler={handleOpen}>
                <DialogBody divider>
                    <Typography variant="h2" className="text-center my-2">Are You sure ?</Typography>
                    <Typography variant="h5" color="blue-gray" className="text-center"> You Cunsulted This patient</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        size="sm"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>NO</span>
                    </Button>
                    <Button variant="outlined" size="sm" color="green" onClick={handleAction}>
                        <span>YES</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}