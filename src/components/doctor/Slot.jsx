import {
    Card,
    CardBody,
    Typography,
    Select,
    Option,
    Spinner,
    Chip,
    Button,
} from "@material-tailwind/react";
import { ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { AddSlot } from "./AddSlot";
import { Appointments } from "./Appointments";
import { useQuery } from "@tanstack/react-query";
import doctorRequest from "../../utils/doctorRequest";
import { useState } from "react";
import { GenerateError, GenerateSuccess } from "../../toast/GenerateError";
import { ToastContainer, toast } from "react-toastify";
export function Slot() {
    const [selectedDate, setSelectedDate] = useState("");
    const { isLoading: dateisLoading, error: dateError, data: dateData } = useQuery({
        queryKey: ['slotsDoctor'],
        queryFn: () => doctorRequest.get(`/slotDate`).then((res) => res.data)
    })
    const { isLoading: slotDataLoading, error: slotDataError, data: slotData } = useQuery(
        ['slots', selectedDate],
        () => doctorRequest.get(`/slots?date=${selectedDate}`).then((res) => res.data),
        { retry: false }
    );
const handleToast = () => {
    toast.warn("please virify your account to add slot")
}
    if (dateisLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (dateError) {
        return <h1>Something went Wrong</h1>
    }
    return (
        <>
        <ToastContainer/>
            <div className="container mx-auto">
                <div className="m-3 flex items-center justify-between gap-8 bg-[#A8C2D0] rounded-md p-3">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            SLOTS AND BOOKINGS
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about provided slots and Bookings
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {dateData && dateData.doctor.verified ?
                            <AddSlot />
                            :
                            <Button onClick={handleToast} variant="filled" className="bg-[#5d7582]">
                                add slot
                            </Button>
                        }
                    </div>
                </div>
                <div className="grid md:grid-cols-2">
                    <div className="col-span-1">
                        <Card className="my-3 mx-3 rounded-md p-3  bg-[#A8C2D0] ">
                            <Typography variant="h5" className="text-blue-gray-900 ">Given Slots</Typography>
                        </Card>
                        <Card className="my-3 mx-3 rounded-md min-h-[20rem] p-3  bg-[#A8C2D0] ">
                            <div className="my-2">
                                <Select
                                    size="md"
                                    color='white'
                                    label="Choose date"
                                    value={selectedDate}
                                    onChange={(val) => {
                                        const newSelectedDate = val
                                        setSelectedDate(newSelectedDate);
                                    }}
                                >
                                    {dateData.data.map((dates, index) => (
                                        <Option key={index} value={dates}>
                                            {new Date(dates).toLocaleDateString('en-GB')}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="grid grid-cols-1 max-h-[30rem] overflow-y-scroll scrollBarDoctor">
                                {slotData && slotData.data ? (
                                    slotData.data.map((item, dataIndex) => (
                                        <div className="col-span-1" key={dataIndex}>
                                            {item.slotes.map((slot, index) => (
                                                <Card className="mt-6 mx-2 min-w-min bg-white rounded-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" key={index}>
                                                    <CardBody className="sm:flex justify-between items-center">
                                                        <div>
                                                            <ClockIcon className={` w-10 sm:w-[4vw]  h-2w-10 sm:h-[4vw]  ${slot.isBooked ? "text-red-400" : "text-green-500"}`} />
                                                        </div>
                                                        <div>
                                                            <Typography color="blue-gray" className="mb-2">
                                                                Date: {new Date(slot.slotDate).toLocaleDateString('en-GB')}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography color="blue-gray" className="mb-2">
                                                                Time: {slot.slotTime}
                                                            </Typography>
                                                        </div>
                                                        <div>
                                                            <Typography color="light-green" className="mb-2">
                                                                <Chip
                                                                    className="text-center my-2"
                                                                    variant="ghost"
                                                                    size="md"
                                                                    value={slot.isBooked === true ? "BOOKED" : "AVAILABLE"}
                                                                    color={slot.isBooked === true ? "red" : "green"}
                                                                />
                                                            </Typography>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-col h-40">
                                        <div className="flex justify-center">
                                            <InformationCircleIcon className="h-24 w-24 text-white" />
                                        </div>
                                        <div className="flex justify-center">
                                            <p className=" text-white">please choose a date to show slots</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div >
                    <div className="col-span-1">
                        <Card className="my-3 mx-3 rounded-md p-3  bg-[#A8C2D0] ">
                            <Typography variant="h5" className="text-blue-gray-900 ">Appointments</Typography>
                        </Card>
                        <Card className="my-3 mx-3 rounded-md p-3  bg-[#A8C2D0]">
                            <Appointments />
                        </Card>
                    </div>
                </div >
            </div>
        </>
    );
}