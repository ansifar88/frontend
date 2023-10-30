import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import VClogo from '../../logos/vc-high-resolution-logo-transparent.png'
import Rx from '../../logos/rx.jpg'
export function Prescription() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button onClick={handleOpen} variant="filled" size="sm">
                Prescription
            </Button>
            <Dialog open={open} handler={handleOpen} size="lg" className="rounded-none ">
                <DialogHeader className="flex justify-end text-sm"> <Button size="sm" variant="text">save</Button> </DialogHeader>
                <hr />
                <DialogBody className="px-0 ">
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3">
                            <div className="col-span-1 flex items-center">
                                <img src={VClogo} className=" h-10 sm:h-16 ms-3" />
                            </div>
                            <div className="sm:col-span-2 bg-[#023E8A] h-20 rounded-s-full">
                                <Typography variant="h5" className="px-10 pt-2 text-white">Dr Benjamin luise</Typography>
                                <Typography className="px-10 pt-2 text-white">MBBS ,MD</Typography>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="grid grid-cols-2 m-3">
                            <div>
                                <Typography className="my-1">Date : </Typography>
                                <Typography className="my-1">Name : Muhammed Ansif</Typography>
                                <Typography className="my-1">Place : Kuttiady</Typography>
                                <Typography className="my-1">Height : 180 cm</Typography>
                            </div>
                            <div>
                                <Typography className="my-1">.</Typography>
                                <Typography className="my-1">Age : 24</Typography>
                                <Typography className="my-1">Blood Group : B+</Typography>
                                <Typography className="my-1">Weight : 50 Kg</Typography>
                            </div>

                        </div>
                        <hr className="my-2" />
                        <div>
                            <div>
                                <img src={Rx} className="h-16" />
                            </div>
                            <div className="ms-16">
                                <Typography>medicine 1</Typography>
                                <Typography>medicine 2</Typography>
                                <Typography>medicine 3</Typography>
                                <Typography>medicine 4</Typography>
                            </div>
                            <div className="m-3 border-2 rounded-md p-2">
                                <Typography>Instructions :-</Typography>
                                <hr />
                                <Typography>Instructions will appear here</Typography>
                            </div>
                        </div>
                    </div>
                </DialogBody>

            </Dialog>
        </>
    );
}