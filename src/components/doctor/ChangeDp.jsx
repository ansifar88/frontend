import React, { useState } from "react";
import dp from '../../logos/dp.png'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Input,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { dpUpdate } from "../../api/doctorApi";
import { useFormik } from "formik";
import { dpUpdateSchema } from "../../yup/validation";
import { useQueryClient } from "@tanstack/react-query";
import { setdoctordetails } from "../../Redux/DoctorSlice";
import { useDispatch, useSelector } from "react-redux";

export function ChangeDp({ id }) {
    const { doctorInfo } = useSelector(state => state.doctor)

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    // const [photo, setPhoto] = useState('')
    const handleOpen = () => setOpen(!open);
    const queryClient = useQueryClient()
    const initialValue = {
        dp: ""
    }
    const {
        values,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: initialValue,
        validationSchema: dpUpdateSchema,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append("dp", values.dp);

            const response = await dpUpdate(formData, id)
            if (response.data) {

                console.log(response);
                dispatch(setdoctordetails({
                    doctorInfo: {
                        ...doctorInfo, // Spread the existing properties
                        displaypicture: response.data.displaypicture // Update the displaypicture property
                    }
                }));

                setOpen(false);
                queryClient.invalidateQueries(["doctor"]);
            }

        }
    })
    return (
        <>
            {/* <Button onClick={handleOpen} variant="text">
                Open Dialog
            </Button> */}
            <p onClick={handleOpen}>
                <PencilSquareIcon className="h-9 w-9" />
            </p>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>Change profile picture</DialogHeader>
                <DialogBody divider className="flex-col justify-center items-center">

                    {/* <img src={photo ? URL.createObjectURL(photo) : dp} alt="dp" className="h-90 rounded-full" /> */}
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* <input type="file" name="dp" accept="image/*" onChange={(e) => { setPhoto(e.target.files[0]) }} /> */}
                        <Input
                            size="xs"
                            type="file"
                            variant="standard"
                            name="dp"
                            label="Profile photo"
                            onChange={(e) => {
                                const selectedFile = e.currentTarget.files[0];
                                setFieldValue("dp", selectedFile);
                            }}
                        />

                        <div className="flex justify-between my-5">

                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="fill" className="bg-[#5d7582]" type="submit">
                                <span>Confirm</span>
                            </Button>
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>

                </DialogFooter>
            </Dialog>
        </>
    );
}