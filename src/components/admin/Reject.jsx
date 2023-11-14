import React from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { rejectDoctorSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { rejectDoctor } from "../../api/adminApi";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function Reject({ id }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const initialvalues = {
        reason: ""
    }
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
    } = useFormik({
        initialValues: initialvalues,
        validationSchema: rejectDoctorSchema,
        onSubmit: async (values) => {
            const response = await rejectDoctor(values, id)
            if (response.data.reject) {
                setOpen(!open)
                queryClient.invalidateQueries('doctorverification')
                navigate('/admin/notifications')
            }
        }
    })
    return (
        <>
            <Button onClick={handleOpen} className="rounded-none bg-red-500 hover:bg-red-800">reject</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <form onSubmit={handleSubmit}>
                    <Card className="mx-auto rounded-none w-full max-w-[24rem]">
                        <CardHeader
                            variant="filled"
                            color="red"
                            className="mb-4 rounded-none grid h-28 place-items-center shadow-none"
                        >
                            <Typography variant="h5" color="white">
                                REJECT VERIFICATION
                            </Typography>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4">
                            <Textarea
                                label="Reason"
                                variant="standard"
                                size="lg"
                                name="reason"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.reason}
                            />
                            {touched.reason && errors.reason && (
                                <div className="text-red-500 text-xs ">
                                    {errors.reason}
                                </div>
                            )}
                        </CardBody>
                        <CardFooter className="pt-0 flex justify-around">
                            <Button className="hover:bg-red-500 hover:text-white rounded-none" variant="text" onClick={handleOpen} >
                                cancel
                            </Button>
                            <Button variant="filled" type="submit" className="rounded-none bg-green-700"  >
                                confirm
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Dialog>
        </>
    );
}