import {
  Card,
  Typography,
  Badge,
} from "@material-tailwind/react";
import dp from '../../logos/dp.png'
import { Loading } from "../common/Loading";
import { UserIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/solid'
import { Form } from "./Form";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import { ChangeDp } from "./changeDp";
import { EditProfile } from "./EditProfile";
import { GenerateError } from "../../toast/GenerateError";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(null);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userRequest.get(`/profile`).then((res) => res.data),
  });
  if (isLoading) {
    return <>
      <Loading />
    </>
  }

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
      <div className="container mx-auto ">
        <Card shadow={false} className="w-full rounded-md md:grid grid-cols-3 h-auto py-3 ps-3 md:pb-10 m-b-2 min-h-[30rem] max-h-[60rem] max-w-[94rem] m-3 bg-[#CAF0F8]">
          <div className="col-span-1 flex justify-center items-center">
            <Badge overlap="circular" content={<ChangeDp id={data.data._id} />} placement="bottom-end" className=" h-16 w-16 md:h-16 md:w-16 bg-[#5d7582] cursor-pointer" >
              <div className="h-72 w-72  md:h-72 md:w-72">
                <img
                  size="md"
                  src={data.data.displaypicture ? data.data.displaypicture : dp}
                  alt="tania andrew"
                  className="rounded-full h-72 w-72  md:h-72 md:w-72 ms-0"
                />
                <div className="flex flex-col justify-center items-center ">
                  <Typography variant="h3" className="text-[#2457C5] py-3">{data.data.name}</Typography>
                  <Typography variant="h5" className="text-[#2457C5]">{data.data.email}</Typography>
                </div>
              </div>
            </Badge>
          </div>
          <div className="col-span-2 text-[#2457C5]">
            <div>
              <div className="h-10  flex-col justify-start  items-center">
                <div className="flex justify-end items-center me-5">
                  {data.data.completed === true ?
                    <EditProfile user={data.data} />
                    : ""
                  }
                </div>
              </div>
              {data.data.completed === true ? (
                <>
                  <div className="flex justify-around my-16">
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
                    <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-40 ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold">{data.data.weight}</p>
                        <p>Kg</p>
                      </div>
                      <p>weight</p>
                    </div>
                    <div className="flex-col jutify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-40 ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold">{data.data.height}</p>
                        <p>cm</p>
                      </div>
                      <p>height</p>
                    </div>
                    <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-40 ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold">{data.data.blood}</p>
                        <p></p>
                      </div>
                      <p>Blood</p>
                    </div>
                    <div className="flex-col justify-center h-20 rounded-lg border-4 p-1 mx-5 md:mx-10 border-[#023f8aa0] w-40  ">
                      <div className="flex items-end gap-2">
                        <p className="text-4xl font-extrabold flex">₹ {data.data.wallet}</p>
                      </div>
                      <p>Wallet</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center h-[10rem] w-[30rem] mt-10 ">
                    <div>
                      <Typography variant="h5" className="text-red-700">Please complete your profile </Typography>
                    </div>
                    <Form />
                  </div>
                </>
              )
              }
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}