import {
    Card,
    CardHeader,
    Typography,
    Button,
    Spinner,
} from "@material-tailwind/react";
import dp from '../../logos/dp.png'

import { UserIcon } from '@heroicons/react/24/solid'
import { useQuery } from "@tanstack/react-query";
import userRequest from "../../utils/userRequest";
import { useNavigate } from "react-router-dom";
export function Doctors() {
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => userRequest.get('/doctors').then((res) => res.data),
    })
    // console.log(data);
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
        return <h1>Something went Wrong</h1>
    }
    return (
        <>

            <div className="h-10">
                <h6 className="m-5 text-3xl font-semibold">OUR DOCTORS</h6>
            </div>
            <div className="grid sm:grid-cols-2">
                {data.data.map(
                    ({ name, currentHospital, _id, department, qualification,displaypicture }) => (


                        <Card color="transparent" key={_id} shadow={false} className="w-72 h-28 md:w-full md:h-52 max-w-[45rem] bg-[#CAF0F8] mt-5 ms-5 hover:bg-[#84d0fb] cursor-pointer" onClick={() => navigate(`/doctorr/${_id}`)}>
                            <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex items-center gap-4 pt-0 pb-8"
                            >
                                <img
                                    size="lg"

                                    src={displaypicture ? displaypicture : dp}                                    alt="tania andrew"
                                    className=" h-14 md:h-40 md:w-40 ms-5 rounded-b-full rounded-s-full"
                                />
                                {/* <div className="h-40 w-40 ms-5 rounded-b-full rounded-s-full bg-white">
                         <UserIcon className="h-40 w-40 "/>
                                </div> */}
                                <div className="flex w-full flex-col gap-0.5 ">
                                    <div className="flex items-center justify-between">
                                        <Typography variant="h5" className="text-[#023E8A] mt-3 text-xs md:text-3xl">
                                           Dr. {name} , {qualification}
                                        </Typography>
                                        <div className="5 flex-col items-center  gap-0">



                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>

                                            <Typography color="blue-gray" className="text-xs md:text-lg"> {department.departmentName}</Typography>
                                            <Typography color="blue-gray" className="text-xs md:text-lg" >Working @ {currentHospital}</Typography>
                                            {/* <StarIcon /> */}
                                            <p className="text-xs md:text-lg">rating</p>
                                        </div>
                                        <div>
                                            {/* <Button variant="filled" className=" me-2 md:me-10 invisible md:visible" size="md" onClick={() => navigate(`/doctor`)}> view</Button> */}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))
                }
            </div>
        </>
    );
}