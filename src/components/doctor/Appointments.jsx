import { Card, CardBody, Chip, Option, Select, Spinner, Typography } from '@material-tailwind/react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import doctorRequest from '../../utils/doctorRequest';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import dp from '../../logos/dp.png'
export const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState("");


    const { isLoading: dateisLoading, error: dateError, data: dateData } = useQuery({
        queryKey: ['appointmentsDoctor'],
        queryFn: () => doctorRequest.get(`/appointmentDate`).then((res) => res.data)
    })
    const { isLoading: appointmentDataLoading, error: appointmentDataError, data: appointmentData } = useQuery(
        ['appointments', selectedDate],
        () => doctorRequest.get(`/appointments?date=${selectedDate}`).then((res) => res.data),
        { retry: false }
    );
    console.log(appointmentData);
    if (dateisLoading) {
        return <div className="h-20 flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    return (
        <>
            <div className="my-2  ">

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
                <div className='min-h-[15rem] max-h-[50rem] overflow-y-scroll'>
                {appointmentData ? appointmentData.data.map((appointment, index) => (


                    <Card className="  mt-6 mx-2 min-w-min rounded-md bg-white  hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 " key={index} >
                        <Chip
                            value={appointment.AppoinmentStatus=="active" ? "Active" : "Expired"}
                            className='rounded-t-md rounded-b-none'
                            variant='filled'
                            color='green'
                        />
                        <CardBody className="flex justify-around">
                            <div>

                                <div>
                                    <img src={dp ?? appointment.user.displayPicture} className={` w-10 sm:w-[5vw]  h-2w-10 sm:h-[5vw]  text-green-500`} />
                                </div>
                                <div>
                                    <Typography color="blue-gray" className="mb-2">
                                        {appointment.user.name}
                                    </Typography>
                                </div>
                            </div>
                            <div>


                                <div>
                                    <Typography color="blue-gray" className="mb-2">
                                        Date:
                                        {new Date(appointment.scheduledAt.slotDate).toLocaleDateString('en-GB')}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography color="blue-gray" className="mb-2">
                                        Time: {appointment.scheduledAt.slotTime}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography color="blue-gray" className="mb-2">
                                        Status: {appointment.status}
                                    </Typography>
                                </div>
                            </div>

                        </CardBody>

                    </Card>
                )) : (
                    <div className="flex-col h-40">
                    <div className="flex justify-center">

                        <InformationCircleIcon className="h-24 w-24 text-white" />
                    </div>
                    <div className="flex justify-center">

                        <p className=" text-white">please choose a date to show Your Appointments</p>
                    </div>
                </div>
                )}
                </div>
            </div>
        </>
    )
}


