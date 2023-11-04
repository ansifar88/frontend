import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
    Typography,
    Rating,
} from "@material-tailwind/react";
import { addReview } from "../../api/userApi";
import { GenerateSuccess } from "../../toast/GenerateError";
import { ToastContainer } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export function Review({ id }) {
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState("");
    const queryClient = useQueryClient()
    const handleOpen = () => setOpen(!open);

    const handleRating = (newRating) => {
        setRating(newRating)
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = {
                rating: rating,
                review: review,
                id: id
            }
            const res = await addReview(data)

            if (res.data.created) {
                queryClient.invalidateQueries(["review"])
                handleOpen()
                GenerateSuccess(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Button size="sm" variant="outlined" className="rounded-full hover:bg-[#023E8A] hover:text-white" onClick={handleOpen}>review</Button>
            <Dialog open={open} size="xs" handler={handleOpen} className="rounded-none">
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        {" "}
                        <Typography className="mb-1" variant="h4">
                        
                        </Typography>
                    </DialogHeader>

                </div>
                <DialogBody>

                    <div className="grid gap-6 ">

                        <Rating value={rating} className="h-16" onChange={handleRating} />

                        <Textarea label="Message" value={review} onChange={(e) => setReview(e.target.value)} />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button variant="filled" size="sm" color="blue" onClick={handleSubmit}>
                        send
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </>
    );
}