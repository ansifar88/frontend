import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
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
    Select,
    Option,
    Spinner,
} from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userEditProfileSchema } from "../../yup/validation";
import { editProfile } from "../../api/userApi";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

export function EditProfile({ user }) {
    const { userInfo } = useSelector((state) => state.user);
    const id = userInfo.id;
    const [open, setOpen] = React.useState(false);
    const queryClient = useQueryClient();

    const { isLoading: cityLoading, error: cityError, data: cityData } = useQuery({
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
        name: user ? user.name : "",
        gender: user ? user.gender : "",
        city: user ? user.city : "",
        dob: user ? user.dob : "",
        height: user ? user.height : "",
        weight: user ? user.weight : "",
        blood: user ? user.blood : "",
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
        validationSchema: userEditProfileSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const response = await editProfile(values, id);
            if (response) {
                setOpen(!open);
                queryClient.invalidateQueries(["profile"]);
            }
        },
    });

    const handleOpen = () => setOpen(!open);

    if (cityLoading) {
        return (
            <div className="">
                <Spinner color="blue" className="h-5 w-5 me-10" />
            </div>
        );
    }

    if (cityError) {
        return <h1>Something went Wrong</h1>;
    }

    return (
        <>
            <p onClick={handleOpen} className="hover:bg-[#2457C5] hover:text-white  cursor-pointer  rounded-full text-[#2457C5] text-xs"><PencilSquareIcon className="w-5 h-5 m-3" /></p>
            <Dialog
                open={open}
                handler={handleOpen}
                size="sm"
                className="rounded-none"
            >
                <DialogHeader>EDIT PROFILE</DialogHeader>
                <DialogBody className="flex justify-center " >
                    <form onSubmit={handleSubmit} encType="multipart/form-data" >
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
                                            {cityData.map((item, index) => (
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
