import React, { useState } from "react";
import Chart from "react-apexcharts";
import { UserGroupIcon, WalletIcon, DocumentIcon } from '@heroicons/react/24/outline'
import Icon from '../../logos/vc-favicon-white.png'
import { Loading } from '../common/Loading'
import {
    Card,
    CardBody,
    Spinner,
    Typography
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { dashBoard } from "../../api/doctorApi";

function Dashboard() {

    const { isLoading, error, data } = useQuery({
        queryKey: ["dashboardDoctor"],
        queryFn: () => dashBoard().then((res) => res.data)
    })

    const series = [data && data.consultedCount, data && data.notConsultedCount, data && data.canceledCount];
    const options = {
        chart: {
            width: 380,
            type: "pie",
        },
        labels: ["cunsulted", "Not Cunsulted", "Cancelled"],
    };



    if (isLoading) {
        return <Loading />
    }
    if (error) {
        return <div>dfgdfg</div>
    }

    return (
        <>
            <div className="conatainer mx-auto">
                <Card className="shadow-none  m-3 bg-transparent">
                    <div className="grid  sm:grid-cols-3">

                        <div className="flex justify-center">
                            <Card className="h-36 w-80 bg-[#A8C2D0] rounded-md p-2 m-2 shadow-lg hover:bg-[#5a707d]">
                                <div className="flex">
                                    <DocumentIcon className="h-7 w-7 me-2 text-white" />
                                    <div className="flex flex-col">

                                        <Typography variant="h4" className="text-white">APPOINTMENTS</Typography>
                                        <div className="flex items-baseline">
                                            <Typography variant="h1" className="text-white my-3 me-3">{data ? data.total : 0} </Typography>
                                            <Typography className="text-blue-600 my-3">Appointments </Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="flex justify-center">
                            <Card className="h-36 w-80 bg-[#A8C2D0] rounded-md p-2 m-2 shadow-lg hover:bg-[#5a707d]">
                                <div className="flex">
                                    <UserGroupIcon className="w-7 h-8 me-2 text-white" />
                                    <div className="flex flex-col">
                                        <Typography variant="h4" className="text-white">PATIENTS</Typography>
                                        <div className="flex items-baseline">
                                            <Typography variant="h1" className="text-white my-3 me-3">{data ? data.patientsCount : 0} </Typography>
                                            <Typography className="text-blue-600 my-3">Patients</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="flex justify-center">
                            <Card className="h-36 w-80 bg-[#A8C2D0] rounded-md p-2  shadow-lg hover:bg-[#5a707d]">
                                <div className="flex">
                                    <WalletIcon className="h-7 w-7 me-2 text-white" />
                                    <div className="flex flex-col">
                                        <Typography variant="h4" className="text-white">WALLET</Typography>
                                        <div className="flex items-baseline">

                                            <Typography variant="h1" className="text-white my-3 me-3">{data ? data.wallet : 0 }</Typography>
                                            <Typography className="text-blue-600 my-3">Balance</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>
                </Card>

                <div className="flex justify-center flex-col items-center">
                    <Typography variant="h2" className="py-5">
                        {/* Report */}
                    </Typography>
                    <div>

                    </div>
                    <div className="">
                        {/* <Card className="mt-6 rounded-md w-[80rem] h-[20rem]  mb-9">
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    Weekly Data
                                </Typography>
                                <Chart
                                    options={chartOptions}
                                    series={chartData}
                                    type="bar"
                                    width="100%"
                                    height="100%"
                                />
                            </CardBody>
                        </Card> */}
                        <Card className="mt-6 w-[80rem] mb-9 rounded-md bg-[#A8C2D0]">
                            <CardBody>
                                <Typography variant="h4" color="white" className="mb-2">
                                    APPOINTMENT STATUS
                                </Typography>
                                <Chart
                                    options={options}
                                    type="pie"
                                    width="100%"
                                    height="200%"
                                    series={series}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
