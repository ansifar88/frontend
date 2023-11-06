import { Button, Card, Typography } from "@material-tailwind/react"
import { UserIcon, AcademicCapIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/outline'
import Icon from '../../logos/vc-favicon-white.png'
import { useQuery } from "@tanstack/react-query"
import { Loading } from "../common/LoadingDark"
import { dashboard } from "../../api/adminApi"
function Dashboard() {
    const { isLoading, error, data } = useQuery({
        queryKey: ["dashboardAdmin"],
        queryFn: () => dashboard().then((res) => res.data)
    })
    // console.log(data.doctorCounts);
    if (isLoading) {
        <Loading />
    }
    if (error) {
        <Typography>somthing went Wrong</Typography>
    }


    const TABLE_HEAD = ["Name", "Department", "Appointments"];

  



    return (
        <>
            <div className="shadow-none m-5">
                <div className="grid  sm:grid-cols-3">

                    <div className="flex md:justify-start">
                        <Card className="h-36 w-80 bg-[#4caabf] rounded-md p-2 my-2 shadow-sm hover:bg-[#377d8d]">
                            <div className="flex">
                                <UserIcon className="h-7 w-7 me-2 text-white" />
                                <div className="flex flex-col">
                                    <Typography variant="h4" className="text-white">USERS</Typography>
                                    <div className="flex items-baseline">
                                        <Typography variant="h1" className="text-white my-3 me-3">{data && data.totalUsers} </Typography>
                                        <Typography className="text-white my-3">users </Typography>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex md:justify-center">
                        <Card className="h-36 w-80 bg-[#4caabf] rounded-md p-2 my-2 shadow-sm hover:bg-[#377d8d]">
                            <div className="flex">
                                <img src={Icon} className="w-7 h-8 me-2" />

                                <div className="flex flex-col">

                                    <Typography variant="h4" className="text-white">DOCTORS</Typography>
                                    <div className="flex items-baseline">
                                        <Typography variant="h1" className="text-white my-3 me-3">{data && data.totalDoctors} </Typography>
                                        <Typography className="text-white my-3">Doctors </Typography>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="flex md:justify-end">
                        <Card className="h-36 w-80 bg-[#4caabf] rounded-md p-2 my-2 shadow-sm hover:bg-[#377d8d]">
                            <div className="flex">
                                <AcademicCapIcon className="h-7 w-7 me-2 text-white" />
                                <div className="flex flex-col">
                                    <Typography variant="h4" className="text-white">DEPARTMENTS</Typography>
                                    <div className="flex items-baseline">
                                        <Typography variant="h1" className="text-white my-3 me-3">{data && data.totalDepartments} </Typography>
                                        <Typography className="text-white my-3">Departments </Typography>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="m-5">
                <Card className="h-full w-full rounded-sm bg-[#97e6f8]">
                    <Typography variant="h4" className="my-3 mx-3 text-white">APPOINTMENT SUMMARY</Typography>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 text-center p-4">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                            className=" leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className=""> 
                            {data ? data.doctorCounts.map(({ name, _id, appointmentCount,department }, index) => {
                                const isLast = index === data.doctorCounts.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={`${classes} bg-blue-gray-50/50 text-center `} >
                                            <Typography variant="paragraph" color="blue-gray" className="font-medium">
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} bg-blue-gray-50/50 text-center `}>
                                            <Typography variant="paragraph" color="blue-gray" className="font-normal">
                                                {department}
                                            </Typography>
                                        </td>
                                        <td className={`${classes} bg-blue-gray-50/50 text-center `} >
                                            <Typography variant="paragraph" color="blue-gray" className="font-normal">
                                                {appointmentCount}
                                            </Typography>
                                        </td>
                                        {/* <td className={`${classes} bg-blue-gray-50/50  text-center flex ` }>
                                            <Button  variant="text"  size="md"  className="rounded-none flex items-center">
                                        <EyeIcon className="h-6 me-2 "/>
                                                view
                                            </Button>
                                        </td> */}
                                    </tr>
                                );
                            }):""}
                        </tbody>
                    </table>
                </Card>
            </div>

        </>
    )
}

export default Dashboard
