import React, { useState } from "react";
import {
    GetCountries,
    GetState,
    GetCity,
} from "react-country-state-city";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Select,
    Option,
    Textarea,
    Spinner,
} from "@material-tailwind/react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { userProfileUpdateSchema } from "../../yup/validation";
import { updateProfile } from "../../api/userApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

export function Form() {
    const { userInfo } = useSelector((state) => state.user);
    const id = userInfo.id;
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();

    // Use useQuery for fetching data
    const { isLoading, error, data } = useQuery({
        queryKey: ['city'],
        queryFn: async () => {
            try {
                const countries = await GetCountries();
                const countryId = 101;
                const states = await GetState(countryId);
                const stateId = 4028;
                const cities = await GetCity(countryId, stateId);
                return cities;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    });

    const initialValues = {
        gender: "",
        city: "",
        dob: "",
        height: "",
        weight: "",
        blood: "",
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
        validationSchema: userProfileUpdateSchema,
        onSubmit: async (values) => {
            const response = await updateProfile(values, id);
            if (response) {
                setOpen(!open);
                queryClient.invalidateQueries(["profile"]);
            }
        },
    });

    const handleOpen = () => setOpen(!open);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Spinner color="blue" className="h-10 w-10 " />
            </div>
        );
    }

    if (error) {
        return <h1>Something went Wrong</h1>;
    }

    return (
        <>
            <Button onClick={handleOpen} variant="outlined">
                Complete Profile
            </Button>
            <Dialog
                open={open}
                handler={handleOpen}
                size="xs"
                className="rounded-none"
            >
                <DialogHeader>COMPLETE PROFILE</DialogHeader>
                <DialogBody className="flex justify-center " >
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
                        <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col ">


                                <div className="grid md:grid-cols-2 gap-4 ">
                                    <div className="col-span-1 ">

                                        <Select
                                            variant="standard"
                                            label="Gender"
                                            name="gender"
                                            value={values.gender}
                                            onBlur={handleBlur}
                                            onChange={(selectedValue) => {
                                                setFieldValue("gender", selectedValue);
                                            }}
                                        >

                                            <Option value="MALE">
                                                MALE
                                            </Option >
                                            <Option value="FEMALE">
                                                FEMALE
                                            </Option>
                                            <Option value="OTHER">
                                                OTHER
                                            </Option>

                                        </Select>
                                        {touched.gender && errors.gender && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.gender}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-1 ">
                                        <Select
                                            variant="standard"
                                            label="City"
                                            name="city"
                                            value={values.city}
                                            onBlur={handleBlur}
                                            onChange={(selectedValue) => {
                                                setFieldValue("city", selectedValue);
                                            }}
                                        >
                                            {data.map((item, index) => (
                                                <Option key={index} value={item.name}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </Select>
                                        {touched.city && errors.city && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.city}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 my-2">
                                    <div className="col-span-1 ">

                                        <Input
                                            className="w-5"
                                            size="md"
                                            variant="standard"
                                            name="dob"
                                            type="date"
                                            label="Date of Birth"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.dob}
                                        />
                                        {touched.dob && errors.dob && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.dob}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <Input
                                            size="md"
                                            variant="standard"
                                            name="height"
                                            label="Height"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.height}
                                        />
                                        {touched.height && errors.height && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.height}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 my-2">
                                    <div className="col-span-1">

                                        <Input
                                            size="md"
                                            variant="standard"
                                            name="weight"
                                            label="Weight"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.weight}
                                        />
                                        {touched.weight && errors.weight && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.weight}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <Input
                                            size="md"
                                            variant="standard"
                                            name="blood"
                                            label="Blood Group"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.blood}
                                        />
                                        {touched.blood && errors.blood && (
                                            <div className="text-red-500 text-xs ">
                                                {errors.blood}
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
                                <span>update </span>
                            </Button>

                        </DialogFooter>
                    </form>
                </DialogBody>

            </Dialog>
        </>
    );
}
