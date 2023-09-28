import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
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
                        className="h-44 w-64 m-2 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                        onClick={() => handleOpen(index)}
                    >
                        <img
                            alt="nature"
                            className="h-full w-full object-cover object-center"
                            src={certificate}
                        />
                    </Card>
                    <Dialog size="xl" open={openDialogs[index]} handler={() => handleOpen(index)}>
                        {/* <DialogHeader className="justify-between">
              <div className="flex items-center gap-2">
                <Button color="green" size="sm">
                  Download
                </Button>
              </div>
            </DialogHeader> */}
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
