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
import { manageUser } from "../../api/adminApi";
export function ManageUser({ data }) {
    console.log(data);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const queryClient = useQueryClient()
    const handleAction = async () => {
        await manageUser(data._id)
        queryClient.invalidateQueries("users")
        setOpen(!open)
    }
    return (
        <>
            <Tooltip content={data.is_blocked ? "unblock User" : "Block User"}>
                <Button
                    size="sm"
                    color={data.is_blocked ? "green" : "red"}
                    className="rounded-md flex gap-3"
                    variant="outlined"
                    onClick={handleOpen}>

                    {data.is_blocked ? ""
                        : <NoSymbolIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />
                    }
                    {data.is_blocked ? 'Unblock' : 'Block'}
                </Button>
            </Tooltip>
            <Dialog open={open} size="xs" className="rounded-none" handler={handleOpen}>
                <DialogBody divider>
                    <Typography variant="h2" className="text-center my-2">Are You sure ?</Typography>
                    <Typography variant="h5" color="blue-gray" className="text-center">{data.is_blocked ? "Unblock" : "Block"} {data.name}</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="red"
                        size="sm"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>NO</span>
                    </Button>
                    <Button variant="filled" size="sm" color="green" onClick={handleAction}>
                        <span>YES</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}