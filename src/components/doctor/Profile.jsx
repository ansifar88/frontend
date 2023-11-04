import { Accordion, AccordionBody, AccordionHeader, Badge, Card, CardBody, CardFooter, CardHeader, Chip, Spinner, Tooltip, Typography } from "@material-tailwind/react"
import dp from '../../logos/dp.png'
import { ChangeDp } from "./ChangeDp"
import { useLocation, useNavigate } from "react-router-dom"

import doctorRequest from "../../utils/doctorRequest"
import { GenerateError } from "../../toast/GenerateError"
import { useQuery } from "@tanstack/react-query"
import { CheckBadgeIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { Form } from "./Form"
import { useState } from "react"
import { EditProfile } from "./EditProfile"
const Profile = () => {
    const [open, setOpen] = useState(null);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state.id
    const { isLoading, error, data } = useQuery({
        queryKey: ['doctor'],
        queryFn: () => doctorRequest.get(`/profile/${id}`).then((res) => res.data),
    });
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
        if (error.response) {
            if (error.response.status === 403) {
                GenerateError(error.response.data.data.message)
                localStorage.removeItem("currentDoctor")
                navigate("/doctor/login")
            }

        } else {
            return <p>somthing went wrong</p>
        }

    }
    return (
        <>
            <div className='container mx-auto'>
                <div className="grid md:grid-cols-[1fr,50rem]  m-3">
                    <div className=" flex justify-center">
                        <Card className="w-96 rounded-md h-[35rem] bg-[#A8C2D0]">
                            <div className="h-80 rounded-full flex justify-center mt-8">
                                <Badge content={<ChangeDp id={data.data._id} />} overlap="circular" placement="bottom-end" className="h-16 w-16 hover:bg-white hover:text-[#5d7582] bg-[#5d7582] cursor-pointer " >
                                    <img src={data.data.displaypicture ? data.data.displaypicture : dp} alt="profile-picture" className="rounded-full   md:h-80 md:w-80 ms-0 shadow-lg" />

                                </Badge>
                            </div>
                            <CardBody className="text-center">
                                <div className="flex justify-center items-center">

                                    <Typography variant="h4" color="blue-gray" className="mb-2">
                                        {data.data.name}
                                    </Typography>
                                    {data.data.verified && (
                                        <CheckBadgeIcon className="text-blue-500 h-8 m-1 rounded-full " />
                                    )}
                                </div>
                                {data.data.requested && !data.data.verified && (
                                    <h1 className="text-green-600 font-serif">Verification Requested</h1>
                                )}



                                {!data.data.requested && !data.data.verified && (
                                    <Form />
                                )}
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                    {data.data.email}
                                </Typography>
                                <Typography color="blue-gray" className="font-medium" textGradient>
                                    Bio
                                </Typography>
                                <Typography color="blue-gray" className="font-medium italic text-white" textGradient>
                                    {data.data.description}
                                </Typography>

                            </CardBody>

                        </Card>
                    </div>
                    <div className=" grid md:grid-rows-2">
                        {data.data.requested == true ? (
                            <div>
                                <Card className="w-full md:mb-10 h-96 rounded-md bg-[#A8C2D0]">
                                    <div className="m-3 p-3 rounded-md flex justify-between items-center shadow-lg shadow-blue-gray-300 ">
                                        <Typography variant="h5" >Professional Info</Typography>
                                        <EditProfile doctor={data.data} />
                                    </div>
                                    <div className="grid grid-cols-3 mx-10">
                                        <div className="">
                                            <Typography variant="h6" color="blue-gray" className="my-2">HOSPITAL</Typography>
                                            <Typography variant="h6" color="blue-gray" className="my-2">QUALIFICATION</Typography>
                                            <Typography variant="h6" color="blue-gray" className="my-2">EXPERIENCE</Typography>
                                            <Typography variant="h6" color="blue-gray" className="my-2">DEPARTMENT</Typography>
                                            <Typography variant="h6" color="blue-gray" className="my-2">LANGUAGES</Typography>
                                        </div>
                                        <div>
                                            <Typography className="my-2">: {data.data.currentHospital}</Typography>
                                            <Typography className="my-2">: {data.data.qualification} </Typography>
                                            <Typography className="my-2">: {data.data.experience} Years</Typography>
                                            <Typography className="my-2">: {data.data.department.departmentName}</Typography>
                                            <div className="h-16 max-w-[8rem]  ">

                                                <Chip variant="outlined" value="english" className="rounded-full text-center" />
                                            </div>
                                        </div>

                                    </div>
                                </Card>
                            </div>
                        ) : (
                            <div className="flex justify-center text-red-700">

                                <ExclamationCircleIcon className="h-7 w-7 me-6" /> <Typography>Please complete your profile and verify</Typography>
                            </div>
                        )
                        }
                        <div>
                            {/* <Card className="w-full  h-96 rounded-md"> */}
                                <div className=" p-3 bg-white rounded-md flex justify-between shadow-lg">
                                    {/* <Typography variant="h5" >Transactions</Typography>
                                    <Typography variant="h5" color="light-green" >Balance  200</Typography> */}
                                    <Accordion open={open === 1} className="mb-2 rounded-lg  border-blue-gray-100 px-4">
                                        <AccordionHeader
                                            onClick={() => handleOpen(1)}
                                            className={`border-b-0 transition-colors ${open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
                                                }`}
                                        >
                                            <div className="flex justify-between w-full">
                                                <Typography variant="h4">Transactions</Typography>
                                                <Typography variant="h4" className="text-green-800">Wallet: ₹{data.data.wallet}</Typography>
                                            </div>
                                            
                                        </AccordionHeader>
                                        <AccordionBody className="pt-0 text-base font-normal">
                                            <Typography>00</Typography>
                                            <Typography>00</Typography>
                                        </AccordionBody>
                                    </Accordion>
                                </div>
                            {/* </Card> */}

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Profile
