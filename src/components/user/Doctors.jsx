import {
    Card,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import dp from '../../logos/dp.png'
import { Loading } from '../common/Loading'
import './Banner.css'
import { useQuery } from "@tanstack/react-query";
import userRequest from "../../utils/userRequest";
import { useNavigate } from "react-router-dom";
import { GenerateError } from "../../toast/GenerateError";
import { useState } from "react";
import Select from 'react-select';

export function Doctors() {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate()
    const { isLoading, error, data } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => userRequest.get('/doctors').then((res) => res.data),
    })
    if (isLoading) {
        return <Loading />
    }
    if (error) {

        return <p>somthing went wrong</p>

    }
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    return (
        <> 
            <div className="container mx-auto">
                <div className={`flex justify-center items-center h-24 md:h-52 ms-5 mt-4 rounded-lg bg-[url('https://images.unsplash.com/photo-1643780668909-580822430155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')]`}>
                    <Typography color="white" className="docHead animate-head text-xl md:text-4xl">WE ARE HERE TO CURE YOU</Typography>
                </div>
                <div className={`flex justify-center items-center md:h-10 bg-[#CAF0F8] ms-5 mt-4 rounded-lg `}>
                    <Select
                        defaultValue="select"
                        isMulti
                        name="colors"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div className="grid sm:grid-cols-2 mb-5">
                    {data.data.map(
                        ({ name, currentHospital, _id, department, qualification, displaypicture }) => (
                            <Card key={_id} shadow={true} className=" animate-showcontent  border-x-8 border-e-[#CAF0F8] border-x-[#023E8A] col-span-1  sm:w-72 h-28 md:w-full md:h-52 max-w-[40rem] bg-[#CAF0F8] mt-5  mx-5 hover:bg-[#84d0fb] cursor-pointer" onClick={() => navigate('/doctorview', { state: { _id } })}>
                                <CardHeader
                                    color="transparent"
                                    floated={false}
                                    shadow={false}
                                    className="mx-0 flex items-center gap-4 pt-0 pb-8 "
                                >
                                    <img
                                        size="lg"
                                        src={displaypicture ? displaypicture : dp} alt="doctor dp"
                                        className=" h-16 md:h-[10rem] md:w-[10rem] ms-5 rounded-b-full rounded-s-full"
                                    />
                                    <div className="flex w-full flex-col gap-0.5 ">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" className="text-[#023E8A] docName mt-3 text-xs md:text-3xl">
                                                Dr. {name} , {qualification}
                                            </Typography>
                                            <div className="5 flex-col items-center  gap-0">
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                                <Typography color="blue-gray" className="text-xs md:text-lg contents"> {department.departmentName}</Typography>
                                                <Typography color="blue-gray" className="text-xs md:text-lg " >Working @ {currentHospital}</Typography>
                                                <p></p>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    );
}