import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Typography,
} from "@material-tailwind/react";
import VClogo from '../../logos/vc-high-resolution-logo-transparent.png'
import Rx from '../../logos/rx.jpg'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export function Prescription({ Data }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const handleSaveAsPDF = () => {
        const dialogBodyElement = document.querySelector(".dialog-body");
        if (dialogBodyElement) {
            html2canvas(dialogBodyElement, { scale: 2 })
                .then((canvas) => {
                    const imgData = canvas.toDataURL("image/jpeg");
                    const pdf = new jsPDF("p", "mm", "a4");
                    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
                    pdf.save("prescription.pdf");
                });
        }
    };
    return (
        <>
            <Button onClick={handleOpen} variant="filled" size="sm">
                Prescription
            </Button>
            <Dialog open={open} handler={handleOpen} size="md" className="rounded-none ">
                <DialogHeader className="flex justify-end text-sm"> <Button size="sm" variant="text" onClick={handleSaveAsPDF}>save</Button> </DialogHeader>
                <hr />
                <DialogBody className="px-0 dialog-body">
                    {Data ? (
                        <div>
                            <div className="grid grid-cols-2 sm:grid-cols-3">
                                <div className="col-span-1 flex items-center">
                                    <img src={VClogo} className=" h-10 sm:h-16 ms-3" />
                                </div>
                                <div className="sm:col-span-2 bg-[#023E8A] h-20 rounded-s-full">
                                    <Typography variant="h5" className="px-10 pt-2 text-white">Dr. {Data.doctor.name}</Typography>
                                    <Typography className="px-10 pt-2 text-white">{Data.doctor.qualification}</Typography>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <div className="grid grid-cols-2 m-3">
                                <div>
                                    <Typography className="my-1">Date :  {new Date(Data.scheduledAt.slotDate).toLocaleDateString('en-GB')} </Typography>
                                    <Typography className="my-1">Name : {Data.user.name}</Typography>
                                    <Typography className="my-1">Place : {Data.user.city}</Typography>
                                    <Typography className="my-1">Height : {Data.user.height} cm</Typography>
                                </div>
                                <div>
                                    <Typography className="my-1">.</Typography>
                                    <Typography className="my-1">Age : 24</Typography>
                                    <Typography className="my-1">Blood Group : {Data.user.blood}</Typography>
                                    <Typography className="my-1">Weight : {Data.user.weight} Kg</Typography>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <div>
                                <div>
                                    <img src={Rx} className="h-16" />
                                </div>
                                <div className="ms-16 min-h-[14rem]">
                                    {Data.prescription.length > 0 ? Data.prescription.map((medicine, index) => (
                                        <Typography key={index} >{medicine}</Typography>
                                    )) : ("Prescription Not Updated")
                                    }
                                </div>
                                <div className="m-3 border-2 rounded-md p-2">
                                    <Typography>Instructions :-</Typography>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    ) : "Prescription is uploading please wait   "}
                </DialogBody>
            </Dialog>
        </>
    );
}