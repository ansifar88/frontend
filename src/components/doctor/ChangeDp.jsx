import React, { useState } from "react";
import Dp from '../../logos/dp.png'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Input,
} from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
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
        errors,
        touched
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
                        ...doctorInfo,
                        displaypicture: response.data.displaypicture
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
                <CameraIcon className="h-9 w-9" />
            </p>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>Change profile picture</DialogHeader>
                <DialogBody divider className="flex-col justify-center items-center">
                    <div className="flex justify-center">

                        <img src={values.dp ? URL.createObjectURL(values.dp) : Dp} alt="dp" className="h-40 w-40 rounded-full" />
                    </div>
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
                        {touched.dp && errors.dp && (
                            <div className="text-red-500 text-xs ">
                                {errors.dp}
                            </div>
                        )}
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