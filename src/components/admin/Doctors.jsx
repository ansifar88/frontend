import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, NoSymbolIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    Tooltip,
    Spinner,
    CardFooter
} from "@material-tailwind/react";
import dp from '../../logos/dp.png'

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { manageDoctor } from "../../api/adminApi";
import { useEffect, useState } from "react";
import { allDoctors } from "../../api/adminApi";

const TABLE_HEAD = ["Name", "Status", "verified", "Actions"];

export function Doctors() {
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['doctor', { page: page, filter, search: debouncedSearch }],
        queryFn: () => allDoctors({ page: page, filter, search: debouncedSearch }).then((res) => res.data)
    })
    //TAB CHANGE

    const handleTabChange = (tabValue) => {
        setFilter(tabValue);
    };
    //SEARCH HANDLE

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    //PAGINATION HANDLE

    const handlePageChange = (newPage) => {
        const totalPages = Math.ceil(data.count / data.pageSize);
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        setPage(newPage);
    };

    const handleAction = async (doctorId) => {
        await manageDoctor(doctorId)
        queryClient.invalidateQueries("doctor")
    }
    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>
    }
    if (error) {
        return <h1>Something went Wrong</h1>
    }
    return (
        <Card className="h-full w-full ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8 bg-[#CAF0F8] rounded-md p-3">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            DOCTORS
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all  Doctors
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs
                        value={filter}
                        className="w-full md:w-96 bg-[#CAF0F8] rounded-lg "
                        onChange={handleTabChange}
                    >
                        <TabsHeader>
                            <Tab value="" onClick={() => setFilter('all')}>All Doctors</Tab>
                            <Tab value="active" onClick={() => setFilter("active")}>Active</Tab>
                            <Tab value="blocked" onClick={() => setFilter("blocked")}>Blocked</Tab>
                            <Tab value="notVerified" onClick={() => setFilter("notVerified")}>Pending</Tab>
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            value={search}
                            onChange={handleSearchChange}
                            variant="standard"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-hidden px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left m-1 ">
                    <thead className="bg-[#5e838b] ">
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4  text-white"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-100 "
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-[#CAF0F8]">
                        {data.data.map(
                            ({ name, email, is_blocked, verified, displaypicture, _id }, index) => {
                                const isLast = index === data.data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-10">
                                                <Avatar src={displaypicture ? displaypicture : dp} alt={name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={is_blocked === true ? "blocked" : "a c t i v e"}
                                                    color={is_blocked === true ? "red" : "green"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={verified === true ? "Verified" : "pending"}
                                                    color={verified === true ? "green" : "red"}
                                                />
                                            </div>
                                        </td>
                                        <>
                                            {is_blocked === false ? (
                                                <td className={classes}>
                                                    <Tooltip content="Block Doctor">
                                                        <Button size="sm" color="red" className="rounded-md flex gap-3" variant="outlined" onClick={() => handleAction(_id)}>
                                                            <NoSymbolIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />
                                                            block
                                                        </Button>
                                                    </Tooltip>
                                                </td>
                                            ) : (
                                                <td className={classes}>
                                                    <Tooltip content="unblock Doctor">
                                                        <Button size="sm" color="green" className="rounded-md flex px-5" variant="outlined" onClick={() => handleAction(_id)}>
                                                            unblock
                                                        </Button>
                                                    </Tooltip>
                                                </td>
                                            )}
                                        </>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t bg-[#78989f]  p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                </Typography>
                <div className="flex items-center gap-2 ">

                    <Button
                        variant="text"
                        className="flex items-center gap-2 text-white"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                    </Button>
                    <Typography color="gray" className="font-normal text-white">
                        Page <strong className="text-white mx-4">{page}</strong> of{" "}
                        <strong className="text-white mx-4">{Math.ceil(data.count / data.pageSize)}</strong>
                    </Typography>
                    <Button
                        variant="text"
                        className="flex items-center gap-2 text-white"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === Math.ceil(data.count / data.pageSize)}
                    >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}