import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Spinner,
  Tooltip,
  CardFooter,
  Avatar,
  Chip,
  Select,
  Option,
} from "@material-tailwind/react";
import { ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

import { AcademicCapIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import dp from '../../logos/dp.png'
import { GenerateError } from "../../toast/GenerateError";
import { useState } from "react";

export function DoctorSingle() {
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate()
  const location = useLocation();
  const id = location.state._id;
  const { isLoading: docIsLoading, error: docError, data: docData } = useQuery({
    queryKey: ['doctorsingle'],
    queryFn: () => userRequest.get(`/SnDOC/${id}`).then((res) => res.data),
  });
  const { isLoading: dateIsLoading, error: dateError, data: dateData } = useQuery({
    queryKey: ['slotDate'],
    queryFn: () => userRequest.get(`/slotdate?doctorId=${id}`).then((res) => res.data),
  });

  const { isLoading: slotIsLoading, error: slotError, data: slotData } = useQuery({
    queryKey: ['slotUser', selectedDate],
    queryFn: () => userRequest.get(`/slotsuser?date=${selectedDate}&doctorId=${id}`).then((res) => res.data),
  });
  console.log(slotData);
  if (docIsLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
  }
  // if (error) {
  //   return <h1>Something went Wrong</h1>
  // }
  if (docError) {
    if (docError.response) {
      if (docError.response.status === 403) {
        GenerateError(docError.response.docData.data.message)
        localStorage.removeItem("currentUser")
        navigate("/login")
      }

    } else {
      return <p>somthing went wrong</p>
    }

  }
  return (
    <div className="container mx-auto">
      <Card color="transparent" shadow={false} className="w-full md:h-full h-auto  rounded-md max-w-[93rem]  m-3 p-3 text-[#023E8A]">
        {/* <div
        color="transparent"
        // floated={false}
        // shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <img
          size="lg"
          src={data.data.displaypicture ? data.data.displaypicture : dp} alt="tania andrew"
          className="h-20 w-20 md:h-80 md:w-80 rounded-full "
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="md:flex items-center justify-around">
            <Typography variant="h5" color="blue-gray" className="md:text-5xl text-[#023E8A]">
              {data.data.name}
              <div className="flex items-center">
                <AcademicCapIcon className="h-8 w-8 me-2 " />
                <Typography className="md:text-lg my-3 text-[#023E8A]" color="blue-gray">{data.data.qualification}</Typography>
              </div>
              <div className="flex items-center">
                <BuildingLibraryIcon className="h-8 w-8 me-2 " />
                <Typography className="md:text-lg my-3 text-[#023E8A]" color="blue-gray">{data.data.department.departmentName}</Typography>
              </div>
              <Typography className="md:text-lg my-3 text-[#023E8A]" color="blue-gray">Working at {data.data.currentHospital}</Typography>

            </Typography>

            <div className=" flex items-center gap-0">
              <Button className="invisible md:visible">BOOKING</Button>
            </div>
          </div>
        </div>
      </div> */}
        {/* <CardBody className="mb-6 p-0">
        <Button className="visible md:invisible">BOOKING</Button>
        <Typography>
          &quot;{data.data.description}&quot;
        </Typography>
      </CardBody> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr,25rem]">
          <div className="col-span-1">
            <Card className=" rounded-md h-[32.2rem] bg-[#CAF0F8]  w-full px-3">
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-8"
              >
                <img
                  size="lg"
                  src={docData.data.displaypicture ? docData.data.displaypicture : dp} alt="tania andrew"
                  className="h-20 w-20 md:h-72 md:w-72 rounded-full "
                />
                <div className="flex w-full flex-col gap-0.5 ">
                  <div className="flex-col items-center ">
                    <Typography className="text-[#023E8A]" variant="h2" >
                      {docData.data.name}
                    </Typography>
                    <Typography className="text-[#023E8A]" color="[#023E8A]">Working @ {docData.data.currentHospital}</Typography>
                    <Typography variant="h6" color="blue-gray" className="mt-3 text-[#023E8A]">
                      Qualification
                    </Typography>
                    <Typography className="text-[#023E8A]" color="blue-gray">{docData.data.qualification}</Typography>

                    <Typography className="text-[#023E8A]" color="blue-gray">{docData.data.experience} years of experience in {docData.data.department.departmentName}</Typography>
                  </div>

                </div>
              </CardHeader>
              <CardBody className="mb-6 p-0 ">
                <Typography className="text-[#023E8A]">
                  &quot;{docData.data.description}&quot;
                </Typography>
              </CardBody>


            </Card>
          </div>
          <div className="col-span-1">
            <Card className="w-full rounded-md h-[32.2rem] bg-[#CAF0F8] mx-2">
              <div className="bg-inherit shadow-md h-28 px-4 m-2 rounded-md">
                <Typography variant="h5" className="p-1 ms-1 my-3 text-[#023E8A]">Available Slotes </Typography>
                <Select
                  size="md"
                  className="text-[#023E8A]"
                  variant="outlined"
                  label="Choose date"
                  value={selectedDate}
                  onChange={(val) => {
                    const newSelectedDate = val
                    setSelectedDate(newSelectedDate);
                  }}

                >
                  {dateData ? dateData.data.map((dates, index) => (
                    <Option key={index} value={dates}>
                      {new Date(dates).toLocaleDateString('en-GB')}
                    </Option>
                  )) : (
                    <Option >No Slots</Option>
                  )}
                </Select>
              </div>
              <div>
              </div>
              {slotData ? (
                slotData.data.map((item, dataIndex) => (
                  <div className="overflow-y-scroll  mb-2" key={dataIndex}>
                    {item.slotes.map((slot, index) => (
                      <Card className={`bg-white h-auto rounded-md m-3 p-2  hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 border border-b-8 ${slot.isBooked === true ? "border-b-red-700" : " border-b-green-500"} `} key={index}>
                        <div className="flex justify-between" >
                          <div>
                            <Typography color="blue-gray" className="mb-2">
                              Date : {new Date(slot.slotDate).toLocaleDateString('en-GB')}
                            </Typography>
                            <Typography color="blue-gray" className="mb-2">
                              Time : {slot.slotTime}
                            </Typography>
                          </div>
                          <div>
                            <Chip
                              size="sm"
                              value={slot.isBooked === true ? "BOOKED" : "AVAILABLE"}
                              color={slot.isBooked === true ? "red" : "green"} />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ))
              ) : (
                <div className="flex-col h-40">
                  <div className="flex justify-center">

                    <InformationCircleIcon className="h-24 w-24 text-[#023E8A]" />
                  </div>
                  <div className="flex justify-center">

                    <p className=" text-[#023E8A]">please choose a date to show slots</p>
                  </div>
                </div>
              )}
            </Card>
          </div>

        </div>
      </Card>
    </div>
  );
}
