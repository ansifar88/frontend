import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Spinner,
    Button,
} from "@material-tailwind/react";
import { Certificates } from "./Certificates";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import adminRequest from "../../utils/adminRequest";
import { verifyDoctor } from "../../api/adminApi";
import { Reject } from "./Reject";
export const Verification = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ['doctorverification'],
        queryFn: () => adminRequest.get(`/doctor/${id}`).then((res) => res.data),
    });
    const handleVerify = async (docId) => {
        const response = await verifyDoctor(docId)
        console.log(response);
        if (response.data.verified) {
            navigate('/admin/notifications')
        }
    }
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
        return <h1>Something went Wrong</h1>
    }
    return (
        <>
            <div >
                <Card color="transparent" shadow={false} className="w-full rounded-none bg-[#A8C2D0]">
                    <div className="p-5">
                        <CardHeader
                            color="transparent"
                            floated={false}
                            shadow={false}
                            className="mx-0 flex items-center gap-4 pt-0 pb-8"
                        >
                            <div className="relative w-28 h-28 md:w-60 md:h-60">
                                <img
                                    alt="tania andrew"
                                    className="absolute top-0 left-0 w-full h-full rounded-full object-cover"
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Typography variant="h5" color="blue-gray">
                                    Dr . {data.data.name}
                                </Typography>
                                <Typography color="blue-gray">Working @<Typography className="font-bold">{data.data.currentHospital}</Typography>
                                </Typography>
                                <Typography className="text-gray-600">
                                    &quot;{data.data.description}&quot;
                                </Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="mb-6 p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Typography className="text-gray-900">Email Address:</Typography>
                                    <Typography className="font-bold">{data.data.email}</Typography>
                                </div>
                                <div>
                                    <Typography className="text-gray-900">Experience:</Typography>
                                    <Typography className="font-bold">{data.data.experience} years</Typography>
                                </div>
                                <div>
                                    <Typography className="text-gray-900">Qualification:</Typography>
                                    <Typography className="font-bold">{data.data.qualification}</Typography>
                                </div>
                                <div>
                                    <Button variant="filled" className="rounded-none text-xs hover:bg-green-800 text-white me-4 bg-green-600" onClick={() => handleVerify(data.data._id)}>approve</Button>
                                    <Reject id={data.data._id} />
                                </div>
                            </div>
                        </CardBody>
                    </div>
                </Card>
                <div>
                    <Typography variant="h3" className="text-blue-gray-900 m-3">CERTIFICATES</Typography>
                    <div className=" md:overflow-x-auto  md:flex w-[76.2rem] ">
                        <Certificates certificates={data.data.certificates} />
                    </div>
                </div>
            </div>
        </>
    );
}
