import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Select,
  Option,
} from "@material-tailwind/react";
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import dp from '../../logos/dp.png'
import { GenerateError } from "../../toast/GenerateError";
import { useState } from "react";
import { Payment } from "./Payment";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Loading } from "../common/Loading";
import Reviews from "./Reviews";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLICKEY);

export function DoctorSingle() {
  const [selectedDate, setSelectedDate] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [did, setDid] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!docIsLoading && docData) {

      setDid(docData.data._id);
    }
  }, [docIsLoading, docData]);

  useEffect(() => {
    if (did) {
      const makeRequest = async () => {
        try {
          console.log(did, "Before making the request");
          const res = await userRequest.post(`/payment/${did}`);
          console.log(res, "clientSecret response");
          setClientSecret(res.data.clientSecret);
          console.log("After setting the clientSecret");
        } catch (error) {
          console.error("Error while making the request:", error);
        }
      };
      makeRequest();
    }
  }, [did]);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (docIsLoading) {
    return <Loading />
  }

  if (docError) {
  
        return <p>Something went wrong</p>;
      
    }
  

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full md:h-full h-auto   max-w-[93rem] p-3 text-[#023E8A]">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[1fr,25rem]">
            <div className="col-span-1">
              <Card className=" rounded-md h-[32.2rem] bg-[#CAF0F8]  w-full px-3">
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="mx-0  sm:flex sm:items-center gap-4 pt-0 pb-8"
                >
                  <img
                    size="lg"
                    src={docData.data.displaypicture ? docData.data.displaypicture : dp} alt="img"
                    className="h-40 w-40 md:h-72 md:w-72 rounded-full md:ms-14 "
                  />
                  <div className="flex w-full flex-col gap-0.5 ">
                    <div className="flex-col items-center ">
                      <Typography className="text-[#023E8A] docName text-4xl"  >
                        {docData.data.name}
                      </Typography>
                      <Typography className="text-[#023E8A] italic" >Working @ {docData.data.currentHospital}</Typography>
                      <Typography variant="h6" color="blue-gray" className="mt-3 text-[#023E8A]">
                        Qualification
                      </Typography>
                      <Typography className="text-[#023E8A]" color="blue-gray">{docData.data.qualification}</Typography>
                      <Typography className="text-[#023E8A]" color="blue-gray">{docData.data.experience} years of experience in {docData.data.department.departmentName}</Typography>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="mb-6 p-0 max-h-[10rem] overflow-y-scroll scrollBar">
                  <Typography className="text-[#023E8A] italic">
                    &quot;{docData.data.description}&quot;
                  </Typography>
                </CardBody>
              </Card>
            </div>
            <div className="col-span-1">
              <Card className="w-full rounded-md h-[32.2rem] bg-[#CAF0F8] my-2 md:my-0 md:mx-2">
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
                <div className="overflow-y-scroll scrollBar">
                  {slotData ? (
                    slotData.data.map((slot, dataIndex) => (
                      <div className="mb-2" key={dataIndex}>
                        <Card className={`bg-white h-auto rounded-md m-3 p-2  hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 border border-b-8 ${slot.isBooked === true ? "border-b-red-700" : " border-b-green-500"} `} >
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
                                className="mb-2"
                                size="sm"
                                value={slot.isBooked === true ? "not available" : "AVAILABLE"}
                                color={slot.isBooked === true ? "light-blue" : "green"} />
                              {slot.isBooked === false ? clientSecret && (
                                <Elements options={options} stripe={stripePromise}>
                                  <Payment Secret={clientSecret} docId={did} slotId={slot._id} slotDate={slot.slotDate} slotTime={slot.slotTime} fee={docData.data.cunsultationFee} />
                                </Elements>
                              ) : ""
                              }
                            </div>
                          </div>
                        </Card>
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
                </div>
              </Card>
            </div>
          </div>
        </div>
        <Reviews id={docData.data._id} />
      </div>
    </>
  );
}
