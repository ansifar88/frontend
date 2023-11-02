import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Spinner,
  Badge,
  Button,
} from "@material-tailwind/react";
import dp from '../../logos/dp.png'

import { ExclamationCircleIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import { Form } from "./Form";
// import { useSelector } from "react-redux";
import doctorRequest from "../../utils/doctorRequest";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChangeDp } from "./ChangeDp";
import { EditProfile } from "./EditProfile";
import { GenerateError } from "../../toast/GenerateError";

export default function Profile() {
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
    <div className="container mx-auto">
      <Card color="transparent" shadow={false} className="w-full  m-b-2 max-h-[45rem] max-w-[94rem] m-3 bg-[#A8C2D0]">
        <div className="p-5  ">
          <div className="flex justify-end me-5 md:me-10">
            <EditProfile doctor={data.data} />
          </div>
          <div className="flex justify-center">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex  items-center gap-4 pt-0 pb-8 max-w-[70rem]"
            >
              <Badge content={<ChangeDp id={data.data._id} />} overlap="circular" placement="bottom-end" className="h-16 w-16 hover:bg-white hover:text-[#5d7582] bg-[#5d7582] cursor-pointer" >
                <div className="h-28 w-28  md:h-72 md:w-72">
                  <img
                    size="md"
                    src={data.data.displaypicture ? data.data.displaypicture : dp}
                    alt="tania andrew"
                    className="rounded-full h-28 w-28  md:h-72 md:w-72 ms-0"
                  />

                </div>
              </Badge>
              <div className="flex w-full flex-col gap-5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray" className="text-4xl">
                    {data.data.name}
                  </Typography>
                </div>
                <Typography color="blue-gray">{data.data.email} </Typography>
                <Typography>
                  {data.data.description}
                </Typography> 

                {data.data.requested && !data.data.verified && (
                  <h1 className="text-green-600 font-serif">Verification Requested</h1>
                )}

                {data.data.verified && (
                  <div className="bg-blue-500 w-24 flex items-center rounded-full">

                    <CheckBadgeIcon className="text-white h-6 m-1" />
                    <Typography className="text-white font-extralight " >verified</Typography>
                  </div>
                )}

                {!data.data.requested && !data.data.verified && (
                  <Form />
                )}

              </div>
            </CardHeader>
          </div>
        </div>
      </Card>
      <Card color="transparent" shadow={false} className="w-full  m-b-2 max-h-[45rem] max-w-[94rem] m-3 bg-[#A8C2D0] py-10">

        {data.data.requested == true ? (
          <div className=" flex justify-center ">
            <CardBody className="mb-6 p-0 max-w-[70rem] w-1/2 b">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:mb-7">
                  <Typography className="text-gray-900">WORKING AT</Typography>
                  <Typography className="font-bold">{data.data.currentHospital}</Typography>
                </div>
                <div>
                  <Typography className="text-gray-900">EXPERIENCE</Typography>
                  <Typography className="font-bold">{data.data.experience} years</Typography>
                </div>
                <div>
                  <Typography className="text-gray-900">QUALIFICATION</Typography>
                  <Typography className="font-bold">{data.data.qualification}</Typography>
                </div>
                <div>
                  <Typography className="text-gray-900">DEPARTMENT</Typography>
                  <Typography className="font-bold">{data.data.department.departmentName}</Typography>
                </div>

              </div>
            </CardBody>
          </div>) : (
          <div className="flex justify-center text-red-700">

            <ExclamationCircleIcon className="h-7 w-7 me-6" /> <Typography>Please complete your profile and verify</Typography>
          </div>
        )
        }
      </Card>
</div>
    </>
  );
}