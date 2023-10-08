import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { slotSchema } from "../../yup/validation";
import { setSlot } from "../../api/doctorApi";
import {  useSelector } from "react-redux/es/hooks/useSelector";

export function Slot() {
    const { doctorInfo } = useSelector((state) => state.doctor);
    const id = doctorInfo.id;
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
        date: '',
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
                date: values.date,
                startTime: startTime,
                endTime: endTime,
            };

            try {
                console.log(slotData);
                const response = await setSlot(slotData,id);

                console.log('Slot set successfully:', response);
            } catch (error) {

                console.error('Error setting slot:', error);
            }
        }

    })
    return (
        <>

            <div className="grid md:grid-cols-2">
                <div className="col-span-1">
                    <Card className="mt-6   bg-[#A8C2D0] ">
                        <CardBody>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    variant="standard"
                                    label="date"
                                    type="date"
                                    name="date"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.date}
                                />
                                {touched.date && errors.date && (
                                    <div className="text-red-500 text-xs ">
                                        {errors.date}
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
                                    </div>
                                </div>
                                <div className="my-3 flex justify-end">
                                    <Button type="submit">Create</Button>
                                </div>
                            </form>
                        </CardBody>

                    </Card>
                </div>
                <div className="col-span-1">
                    <Card className="mt-6 w-full  bg-deep-orange-100">available slorts</Card>
                </div>
            </div>

        </>
    );
}