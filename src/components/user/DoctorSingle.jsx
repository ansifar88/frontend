import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { AcademicCapIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import userRequest from "../../utils/userRequest";
import dp from '../../logos/dp.png'
import { GenerateError } from "../../toast/GenerateError";

export function DoctorSingle() {
  const navigate = useNavigate()
  const location = useLocation();
  const id = location.state._id;
  const { isLoading, error, data } = useQuery({
    queryKey: ['doctorsingle'],
    queryFn: () => userRequest.get(`/SnDOC/${id}`).then((res) => res.data),
  });
 
  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
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
  return (
    <Card color="transparent" shadow={false} className="w-full md:h-full h-auto max-h-[35rem] max-w-[93rem] bg-[#CAF0F8] m-3 p-3 text-[#023E8A]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
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
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Button className="visible md:invisible">BOOKING</Button>
        <Typography>
          &quot;{data.data.description}&quot;
        </Typography>
      </CardBody>
    </Card>
  );
}
