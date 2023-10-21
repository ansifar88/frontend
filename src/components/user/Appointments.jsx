import {
    Card,
    Typography,
    Chip,
    Button,
    Spinner,
} from "@material-tailwind/react";
import dp from '../../logos/dp.png'
import { useQuery } from "@tanstack/react-query";
import { getAppointmentsUser } from "../../api/userApi";


export function Appointments() {
    const { isLoading, error, data } = useQuery({
        queryKey: ["appointmentsUser"],
        queryFn: () => getAppointmentsUser().then((res) => res.data)
    })
    console.log(data, 'appointments');
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>;
    }
    if (error) {
        return <h1>Something went Wrong</h1>
    }
    return (
        <div className="container mx-auto">
            <Card className='bg-[#CAF0F8] w-full my-2 p-3 shadow-none' >
                <Typography variant="h3">Appointments</Typography>
            </Card>
            {data.data.map((appointments, index) => (


                <Card color="transparent" shadow={false} className="w-full bg-[#CAF0F8] p-3 my-2" key={index}>
                    <div className="grid md:grid-cols-[10rem,1fr,10rem]">

                        <div className=" ">
                            <div
                                color="transparent"

                                className="mx-0 flex items-center gap-4 pt-0 pb-8"
                            >
                                <img
                                    size="lg"
                                    src={appointments.doctor.displaypicture ?? dp}

                                    className="h-16 w-16 md:h-28 md:w-28 rounded-full"
                                />

                            </div>
                        </div>
                        <div className=" ">
                            <Typography variant="h3"className="my-2">
                                Dr {appointments.doctor.name}
                            </Typography>
                            <Typography variant="h6"className="my-2">
                                Working @ {appointments.doctor.currentHospital}
                            </Typography>
                            <div className="flex my-2">

                                <Typography>
                                    Appoints Status :
                                </Typography>
                                <Chip variant="ghost" size="sm" color="green" className="mx-2" value={appointments.AppoinmentStatus} />
                            </div>
                        </div>
                        <div className="flex-col ">

                            <Chip
                                color="cyan"
                                variant="ghost"
                                size="md"
                                value={`Date : ${new Date(appointments.scheduledAt.slotDate).toLocaleDateString('en-GB')}`}
                                className="my-2"
                            />
                            <Chip
                                color="cyan"
                                size="md"
                                variant="ghost"
                                value={`time : ${appointments.scheduledAt.slotTime}`}
                                className="my-2"
                            />
                            <Chip variant="ghost" size="md" color="cyan" className="mx-2 " value={appointments.status} />

                            <Button
                                size="sm"
                                className="my-1  bg-red-500 shadow-none"
                                variant="filled"
                            >cancel</Button>

                        </div>

                    </div>
                </Card>
            ))
            }
        </div>
    );
}