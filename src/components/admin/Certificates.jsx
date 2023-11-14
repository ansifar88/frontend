import React, { useState } from "react";
import {
    Dialog,
    DialogBody,
    Card,
} from "@material-tailwind/react";

export function Certificates({ certificates }) {
    const [openDialogs, setOpenDialogs] = useState(certificates.map(() => false));
    const handleOpen = (index) => {
        const updatedOpenDialogs = [...openDialogs];
        updatedOpenDialogs[index] = !updatedOpenDialogs[index];
        setOpenDialogs(updatedOpenDialogs);
    };

    return (
        <>
            {certificates.map((certificate, index) => (
                <div key={index}>
                    <Card
                        className="h-44 w-64 m-2 cursor-pointer overflow-hidden shadow-lg transition-opacity hover:opacity-90 rounded-sm "
                        onClick={() => handleOpen(index)}
                    >
                        <img
                            alt="nature"
                            className="h-full w-full object-cover object-center"
                            src={certificate}
                        />
                    </Card>
                    <Dialog size="xl" open={openDialogs[index]} handler={() => handleOpen(index)}>
                        <DialogBody divider={true} className="p-0">
                            <img
                                alt="nature"
                                className="h-[48rem] w-full object-cover object-center"
                                src={certificate}
                            />
                        </DialogBody>
                    </Dialog>
                </div>
            ))}
        </>
    );
}
