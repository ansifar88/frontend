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
import { useFormik } from "formik";
import { dpUpdateSchema } from "../../yup/validation";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { dpUpdate } from "../../api/userApi";

export function ChangeDp({ id }) {
    const { userInfo } = useSelector(state => state.user)

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
                // dispatch(setdoctordetails({
                //     doctorInfo: {
                //         ...doctorInfo,
                //         displaypicture: response.data.displaypicture 
                //     }
                // }));

                setOpen(false);
                queryClient.invalidateQueries(["profile"]);
            }

        }
    })
    return (
        <>

            <p onClick={handleOpen}>
                <PencilSquareIcon className="h-9 w-9" />
            </p>
            <Dialog open={open} handler={handleOpen} size="xs" className="bg-[#CAF0F8]">
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