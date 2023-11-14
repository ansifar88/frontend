import React from "react";
import Dp from '../../logos/dp.png'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Spinner,
} from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { dpUpdateSchema } from "../../yup/validation";
import { useQueryClient } from "@tanstack/react-query";
import { dpUpdate } from "../../api/userApi";

export function ChangeDp({ id }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const queryClient = useQueryClient()
    const initialValue = {
        dp: ""
    }
    const {
        values,
        handleSubmit,
        setFieldValue,
        touched,
        errors
    } = useFormik({
        initialValues: initialValue,
        validationSchema: dpUpdateSchema,
        onSubmit:
            async (values) => {
                const formData = new FormData()
                formData.append("dp", values.dp);
                setLoading(true)
                const response = await dpUpdate(formData, id)
                if (response.data) {
                    setLoading(false)
                    setOpen(false);
                    queryClient.invalidateQueries(["profile"]);
                }
            }
    })
    return (
        <>
            <p onClick={handleOpen}>
                <CameraIcon className="h-9 w-9" />
            </p>
            <Dialog open={open} handler={handleOpen} size="xs" className="bg-[#CAF0F8]">
                <DialogHeader>Change profile picture</DialogHeader>
                <DialogBody divider className="flex-col justify-center items-center">
                    <div className="flex justify-center">
                        <img src={values.dp ? URL.createObjectURL(values.dp) : Dp} alt="dp" className="h-40 w-40 rounded-full" />
                    </div>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                            {
                                loading ?
                                    <Button variant="fill" className="bg-[#5d7582] w-24 text-center">
                                        <Spinner className="text-white h-7 w-7" />
                                    </Button>
                                    :
                                    <Button variant="fill" className="bg-[#5d7582]" type="submit">
                                        <span>Confirm</span>
                                    </Button>
                            }
                        </div>
                    </form>
                </DialogBody>
                <DialogFooter>
                </DialogFooter>
            </Dialog>
        </>
    );
}