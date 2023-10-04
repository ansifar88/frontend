import React, { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Spinner,
} from "@material-tailwind/react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { doctorEditProfileSchema } from "../../yup/validation";
import { editProfile } from "../../api/doctorApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import adminRequest from "../../utils/adminRequest";

export function EditProfile({ doctor }) {
    const { doctorInfo } = useSelector((state) => state.doctor);
    const id = doctorInfo.id;
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();

    const initialValues = {
        name: doctor ? doctor.name : "",
        currentHospital: doctor ? doctor.currentHospital : "",
        department: doctor ? doctor.department : "",
        qualification: doctor ? doctor.qualification : "",
        experience: doctor ? doctor.experience : "",
        description: doctor ? doctor.description : "",
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: doctorEditProfileSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const response = await editProfile(values, id);
            if (response) {
                setOpen(!open);
                queryClient.invalidateQueries(["doctor"]);
            }
        },
    });

    const handleOpen = () => setOpen(!open);
    const { isLoading, error, data } = useQuery({
        queryKey: ["department"],
        queryFn: () => adminRequest.get("/department").then((res) => res.data),
    });

    if (isLoading) {
        return (
            <div>
                <Spinner color="blue" className="h-10 w-10 " />
            </div>
        );
    }

    if (error) {
        return <h1>Something went wrong</h1>;
    }
    return (
        <>
            <p onClick={handleOpen} className="hover:bg-[#5d7582] hover:text-white  me-10 cursor-pointer  rounded-full text-[#5d7582] text-xs"><PencilSquareIcon className="w-8 h-8 m-3" /></p>
            <Dialog
                open={open}
                handler={handleOpen}
                size="sm"
                className="rounded-none"
            >
                <DialogHeader>EDIT PROFILE</DialogHeader>
                <DialogBody className="flex justify-center " >
                    <form onSubmit={handleSubmit}  >
                        <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
                            <div className="my-3">

                                <Input
                                    size="md"
                                    variant="standard"
                                    name="name"
                                    label="Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                                {touched.name && errors.name && (
                                    <div className="text-red-500 text-xs ">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4 flex flex-col ">

                                <div className="grid md:grid-cols-2 gap-4 ">
                                    <div className="col-span-1 ">
                                        <Input
                                            size="md"
                                            variant="standard"
                                            name="qualification"
                                            label="Qualification"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.qualification}
                                        />
                                        {touched.qualification && errors.qualification && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.qualification}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-1 ">
                                        <Select
                                            variant="standard"
                                            name="department"
                                            label="Select Department"
                                            value={values.department}
                                            onChange={(selectedValue) => {
                                                setFieldValue("department", selectedValue);
                                            }}
                                        >
                                            {data.data.map((dep) => (
                                                <Option value={dep._id} key={dep._id}>
                                                    {dep.departmentName}
                                                </Option>
                                            ))}
                                        </Select>
                                        {touched.department && errors.department && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.department}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="my-2">

                                    <Input
                                        className="w-5"
                                        size="md"
                                        variant="standard"
                                        name="currentHospital"
                                        label="currentHospital"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.currentHospital}
                                    />
                                    {touched.currentHospital && errors.currentHospital && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.currentHospital}
                                        </div>
                                    )}
                                </div>
                                <div className="my-2">

                                    <Input
                                        size="md"
                                        variant="standard"
                                        name="experience"
                                        label="experience"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.experience}
                                    />
                                    {touched.experience && errors.experience && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.experience}
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-1 gap-4 my-2">

                                    <div className="col-span-1">
                                        <Input
                                            size="md"
                                            variant="standard"
                                            name="description"
                                            label="Description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                        />
                                        {touched.description && errors.description && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <DialogFooter className="flex justify-between">
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="filled" type="submit" color="green">
                                <span>save   </span>
                            </Button>

                        </DialogFooter>
                    </form>
                </DialogBody>

            </Dialog>
        </>
    );
}
