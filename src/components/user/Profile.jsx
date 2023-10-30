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
import {Loading} from "../common/Loading";
import { ExclamationCircleIcon, UserIcon, MapPinIcon, CalendarDaysIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { Form } from "./Form";
// import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import { ChangeDp } from "./changeDp";
import { EditProfile } from "./EditProfile";
import { GenerateError } from "../../toast/GenerateError";

export default function Profile() {
  // const { id } = useParams();
  const location = useLocation();
  const id = location.state && location.state.id;
  const navigate = useNavigate()
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userRequest.get(`/profile/${id}`).then((res) => res.data),
  });
  if (isLoading) {
    return <>
    <Loading/>
    </>
  }
  // if (error) {
  //   return <h1>Something went Wrong</h1>
  // }
  if (error) {
    if (error.response) {
      if (error.response.status === 403) {
        GenerateError(error.response.data.data.message)
        localStorage.removeItem("currentUser")
        navigate("/login")
      }

    } else {
      return <p>somthing went wrong</p>
    }

  }

  const Dob = formatDate(data.data.dob);

  return (
    <>
      <div className="container mx-auto">
        <Card color="transparent" shadow={false} className="w-full rounded-md md:grid grid-cols-3 h-auto py-3 ps-3 md:pb-10 m-b-2  max-h-[60rem] max-w-[94rem] m-3 bg-[#CAF0F8]">
          
          <div className="col-span-1 flex justify-center items-center">

            <Badge overlap="circular" content={<ChangeDp id={data.data._id} />} placement="bottom-end" className=" h-7 w-7 md:h-16 md:w-16 bg-[#5d7582] cursor-pointer" >
              <div className="h-72 w-72  md:h-72 md:w-72">
                <img
                  size="md"
                  src={data.data.displaypicture ? data.data.displaypicture : dp}
                  alt="tania andrew"
                  className="rounded-full h-72 w-72  md:h-72 md:w-72 ms-0"
                />
                <div className="flex justify-around border-2 border-blue-gray-600 m-3 p-3 rounded-md">
                  <Typography variant="h5" className="text-[#2457C5]">wallet</Typography>
                  <Typography variant="h5" className="text-[#2457C5]">₹ {data.data.wallet}</Typography>
                </div>
              </div>
            </Badge>

          </div>

          <div className="col-span-2 text-[#2457C5]">
            <div>
              <div className="h-10 my-8  flex-col justify-start mt-7 items-center">
                <div className="flex justify-between items-center ">
                  <p className="md:text-5xl ">
                    {data.data.name}
                  </p>
                  <EditProfile user={data.data} />
                </div>
                <p className="text-[#648ce2] ">{data.data.email}</p>
              </div>



              {data.data.completed === true ? (
                <>
                  <div className="flex justify-around my-8">

                    <div >
                      <UserIcon className="w-8 ms-1" />
                      <p>{data.data.gender}</p>
                    </div>
                    <div>
                      <MapPinIcon className="w-8 ms-5" />
                      <p>{data.data.city}</p>
                    </div>
                    <div>
                      <CalendarDaysIcon className="w-8 ms-5" />
                      <p>{Dob}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2  h-48 text-[#2457C5]">
                    <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold">{data.data.weight}</p>
                        <p>Kg</p>
                      </div>

                      <p>weight</p>
                    </div>
                    <div className="flex-col jutify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold">{data.data.height}</p>
                        <p>cm</p>
                      </div>

                      <p>height</p>
                    </div>
                    <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-32 ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold">{data.data.blood}</p>
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
                  <div className="flex mt-10 text-red-700">

                    <ExclamationCircleIcon className="h-7 w-7 me-6" /> <Typography>Please complete your profile </Typography>
                  </div>
                  <Form />
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
                {/* <div className="md:mb-7">
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
              </div> */}

              </div>
            </CardBody>
          </div>
          {/* ) : */}


          {/* } */}
        </Card>
      </div>
    </>
  );
}