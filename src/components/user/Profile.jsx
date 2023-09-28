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

import { ExclamationCircleIcon, UserIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
// import { Form } from "./Form";
// import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import userRequest from "../../utils/userRequest";
// import { ChangeDp } from "./ChangeDp";

export default function Profile() {
    const { id } = useParams()
    console.log(id);
    const { isLoading, error, data } = useQuery({
      queryKey: ['profile'],
      queryFn: () => userRequest.get(`/profile/${id}`).then((res) => res.data),
    });
  console.log(data);
    if (isLoading) {
      return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
      return <h1>Something went Wrong</h1>
    }
  return (
    <>
      <Card color="transparent" shadow={false} className="w-full  md:grid grid-cols-3 h-auto py-3 ps-3 md:pb-10 m-b-2  max-h-[60rem] max-w-[94rem] m-3 bg-[#CAF0F8]">
        <div className="col-span-1 flex justify-center items-center">

          <Badge overlap="circular" placement="bottom-end" className=" h-7 w-7 md:h-16 md:w-16 bg-[#5d7582] cursor-pointer" >
            <div className="h-72 w-72  md:h-72 md:w-72">
              <img
                size="md"
                src={dp}
                alt="tania andrew"
                className="rounded-full h-72 w-72  md:h-72 md:w-72 ms-0"
              />

            </div>
          </Badge>

        </div>
        <div className="col-span-2 text-[#2457C5]">
          <div>
            <div className="h-10 my-8  flex-col justify-start mt-7 items-center">
              <p className="text-5xl ">
                Mr {data.data.name}
              </p>
              <p className="text-[#648ce2]">{data.data.email}</p>
            </div>



            {data.data.completed === true ? (
            <>
              <div className="flex justify-around my-8">

              <div >
                <UserIcon className="w-8" />
                <p>gender</p>
              </div>
              <div>
                <MapPinIcon className="w-8" />
                <p>location</p>
              </div>
              <div>
                <CalendarDaysIcon className="w-8" />
                <p>dob</p>
              </div>
            </div>

            <div className="grid grid-cols-2  h-48 text-[#2457C5]">
              <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                <div className="flex items-end gap-2">
                <p className="text-4xl font-extrabold">92</p>
                <p>Kg</p>
                </div>

                <p>weight</p>
              </div>
              <div className="flex-col jutify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                <div className="flex items-end gap-2">
                <p className="text-4xl font-extrabold">275</p>
                <p>cm</p>
                </div>

                <p>height</p>
              </div>
              <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                <div className="flex items-end gap-2">
                <p className="text-4xl font-extrabold">B+</p>
                <p></p>
                </div>

                <p>Blood</p>
              </div>
              <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                <div className="flex items-end gap-2">
                <p className="text-4xl font-extrabold">27</p>
                <p>years</p>
                </div>

                <p>age</p>
              </div>
            </div>
            </>
            ) : (
              <>
              <p className="my-10 text-red-700">Please complte profile</p>
              <Button>complte</Button>
              </>
            ) 
            }


          </div>
        </div>

      </Card>
      <Card color="transparent" shadow={false} className="w-full  m-b-2 max-h-[45rem] max-w-[94rem] m-3 bg-[#A8C2D0] py-10">

        {/* {data.data.requested == true ? ( */}
        <div className=" flex justify-center ">
          <CardBody className="mb-6 p-0 max-w-[70rem] w-1/2 b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:mb-7">
                <Typography className="text-gray-900">WORKING AT</Typography>
                <Typography className="font-bold">dfdfdfd</Typography>
              </div>
              <div>
                <Typography className="text-gray-900">EXPERIENCE</Typography>
                <Typography className="font-bold">dsfsd</Typography>
              </div>
              <div>
                <Typography className="text-gray-900">QUALIFICATION</Typography>
                <Typography className="font-bold">sdfdsf</Typography>
              </div>
              <div>
                <Typography className="text-gray-900">DEPARTMENT</Typography>
                <Typography className="font-bold">ghfghfghfgh</Typography>
              </div>

            </div>
          </CardBody>
        </div>
        {/* ) : */}
        <div className="flex justify-center text-red-700">

          <ExclamationCircleIcon className="h-7 w-7 me-6" /> <Typography>Please complete your profile and verify</Typography>
        </div>

        {/* } */}
      </Card>

    </>
  );
}