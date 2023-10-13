import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    CardBody,
    Typography,

    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { slotSchema } from "../../yup/validation";
import { setSlot } from "../../api/doctorApi";
import { useQueryClient } from "@tanstack/react-query";
export function AddSlot() {
    const [open, setOpen] = React.useState(false);
const queryClient = useQueryClient()
    const handleOpen = () => setOpen(!open);
    const constructTime = (hour, minute, amPm) => {
        let formattedTime = `${hour}:${minute}`;

        // Adjust for AM/PM
        if (amPm === 'PM') {
            const hourInt = parseInt(hour, 10);
            if (hourInt < 12) {
                formattedTime = `${hourInt + 12}:${minute}`;
            }
        }

        return formattedTime;
    };
    const initialValues = {
        startdate: '',
        enddate: '',
        startTimeHour: '',
        startTimeMinute: '',
        startTimeAmPm: '',
        endTimeHour: '',
        endTimeMinute: '',
        endTimeAmPm: '',
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
        validationSchema: slotSchema,
        onSubmit: async (values) => {
            const startTime = constructTime(values.startTimeHour, values.startTimeMinute, values.startTimeAmPm);
            const endTime = constructTime(values.endTimeHour, values.endTimeMinute, values.endTimeAmPm);
            console.log(startTime);
            const slotData = {
                startDate: values.startdate,
                endDate: values.enddate,
                startTime: startTime,
                endTime: endTime,
            };

            try {
                console.log(slotData);
                const response = await setSlot(slotData);

                if(response){
                    setOpen(!open)
                    queryClient.invalidateQueries('slotsDoctor')
                }
            } catch (error) {

                console.error('Error setting slot:', error);
            }
        }

    })
    return (

        <>
            <Button onClick={handleOpen} variant="filled">
                add slot
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>ADD SLOTS</DialogHeader>
                <Card className="">
                    <CardBody>
                        <form onSubmit={handleSubmit}>
                            <p>Start Date</p>
                            <Input
                                className=""
                                variant="standard"
                                label=""
                                type="date"
                                name="startdate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.startdate}
                            />
                            {touched.startdate && errors.startdate && (
                                <div className="text-red-500 text-xs ">
                                    {errors.startdate}
                                </div>
                            )}
                            <p>End Date</p>
                            <Input
                                className=""
                                variant="standard"
                                label=""
                                type="date"
                                name="enddate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.enddate}
                            />
                            {touched.enddate && errors.enddate && (
                                <div className="text-red-500 text-xs ">
                                    {errors.enddate}
                                </div>
                            )}
                            <p>Start Time</p>
                            <div className="grid grid-cols-3 my-3">
                                <div className="col-span-1">
                                    <Select
                                        variant="standard"
                                        name="startTimeHour"
                                        value={values.startTimeHour}
                                        onBlur={handleBlur}
                                        onChange={(selectedValue) => {
                                            setFieldValue("startTimeHour", selectedValue);
                                        }}

                                    >
                                        <Option value="1" > 1</Option>
                                        <Option value="2" > 2</Option>
                                        <Option value="3" > 3</Option>
                                        <Option value="4" > 4</Option>
                                        <Option value="5" > 5</Option>
                                        <Option value="6" > 6</Option>
                                        <Option value="7" > 7</Option>
                                        <Option value="8" > 8</Option>
                                        <Option value="9" > 9</Option>
                                        <Option value="10"> 10</Option>
                                        <Option value="11"> 11</Option>
                                        <Option value="12"> 12</Option>
                                    </Select>
                                    {touched.startTimeHour && errors.startTimeHour && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.startTimeHour}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <Select
                                        variant="standard"
                                        name="startTimeMinute"
                                        value={values.startTimeMinute}
                                        onBlur={handleBlur}
                                        onChange={(selectedValue) => {
                                            setFieldValue("startTimeMinute", selectedValue);
                                        }}
                                    >
                                        <Option value="00"> 00</Option>
                                        <Option value="30"> 30</Option>

                                    </Select>
                                    {touched.startTimeMinute && errors.startTimeMinute && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.startTimeMinute}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <Select
                                        variant="standard"
                                        name="startTimeAmPm"
                                        value={values.startTimeAmPm}
                                        onBlur={handleBlur}
                                        onChange={(selectedValue) => {
                                            setFieldValue("startTimeAmPm", selectedValue);
                                        }}
                                    >
                                        <Option value="AM"> AM</Option>
                                        <Option value="PM"> PM</Option>

                                    </Select>
                                    {touched.startTimeAmPm && errors.startTimeAmPm && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.startTimeAmPm}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p>End Time</p>
                            <div className="grid grid-cols-3 mt-3">
                                <div className="col-span-1">
                                    <Select
                                        variant="standard"
                                        name="endTimeHour"
                                        value={values.endTimeHour}
                                        onBlur={handleBlur}
                                        onChange={(selectedValue) => {
                                            setFieldValue("endTimeHour", selectedValue);
                                        }}
                                    >

                                        <Option value="1" > 1</Option>
                                        <Option value="2" > 2</Option>
                                        <Option value="3" > 3</Option>
                                        <Option value="4" > 4</Option>
                                        <Option value="5" > 5</Option>
                                        <Option value="6" > 6</Option>
                                        <Option value="7" > 7</Option>
                                        <Option value="8" > 8</Option>
                                        <Option value="9" > 9</Option>
                                        <Option value="10"> 10</Option>
                                        <Option value="11"> 11</Option>
                                        <Option value="12"> 12</Option>
                                    </Select>
                                    {touched.endTimeHour && errors.endTimeHour && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.endTimeHour}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <Select
                                        variant="standard"
                                        name="endTimeMinute"
                                        value={values.endTimeMinute}
                                        onBlur={handleBlur}
                                        onChange={(selectedValue) => {
                                            setFieldValue("endTimeMinute", selectedValue);
                                        }}
                                    >
                                        <Option value="00"> 00</Option>
                                        <Option value="30"> 30</Option>

                                    </Select>
                                    {touched.endTimeMinute && errors.endTimeMinute && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.endTimeMinute}
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <Select
                                        variant="standard"
                                        name="endTimeAmPm"
                                        value={values.endTimeAmPm}
                                        onBlur={handleBlur}
                                        onChange={(selectedValue) => {
                                            setFieldValue("endTimeAmPm", selectedValue);
                                        }}
                                    >
                                        <Option value="AM"> AM</Option>
                                        <Option value="PM"> PM</Option>

                                    </Select>
                                    {touched.endTimeAmPm && errors.endTimeAmPm && (
                                        <div className="text-red-500 text-xs ">
                                            {errors.endTimeAmPm}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="my-3 flex justify-end">
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </CardBody>

                </Card>

            </Dialog>
        </>
    );
}