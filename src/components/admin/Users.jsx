import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, NoSymbolIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import dp from '../../logos/dp.png'
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { manageUser } from "../../api/adminApi";
import { useEffect, useState } from "react";
import { allUsers } from "../../api/adminApi";
import { ManageUser } from "./ManageUser";
import { Loading } from "../common/LoadingDark";
const TABLE_HEAD = ["Name", "Status", "joined", "Actions"];

export function Users() {
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
    queryKey: ['users', { page: page, filter, search: debouncedSearch }],
    queryFn: () => allUsers({ page: page, filter, search: debouncedSearch }).then((res) => res.data)
  })
  console.log(data);
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

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const handleAction = async (userId) => {
    await manageUser(userId)
    queryClient.invalidateQueries("users")
  }
  if (isLoading) {
    return <Loading/>
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
              USERS
            </Typography>

            <Typography color="gray" className="mt-1 font-normal">
              See information about all Users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs
            value={filter}
            className="w-full md:w-80 bg-[#5e838b] rounded-lg "
            onChange={handleTabChange}
          >
            <TabsHeader>
              <Tab value="" onClick={() => setFilter('all')}>All Users</Tab>
              <Tab value="active" onClick={() => setFilter("active")}>Active</Tab>
              <Tab value="blocked" onClick={() => setFilter("blocked")}>Blocked</Tab>
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
        <table className="mt-4 w-full min-w-max table-auto text-left m-1">
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
              ({ name, email, is_blocked, joinDate, _id, displaypicture }, index) => {
                const isLast = index === data.data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                const JoinedDate = formatDate(joinDate);
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
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {JoinedDate}
                      </Typography>
                    </td>
                    <>
                      {/* {is_blocked === false ? ( */}
                      <td className={classes}>
                        {/* <Tooltip content={is_blocked ? "unblock User" : "Block User"}>
                          <Button
                            size="sm"
                            color={is_blocked ? "green" : "red"}
                            className="rounded-md flex gap-3"
                            variant="outlined"
                            onClick={() => handleAction(_id)}>

                            {is_blocked ? ""
                              : <NoSymbolIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />
                            }
                            {is_blocked ? 'Unblock' : 'Block'}
                          </Button>
                        </Tooltip> */}
                        <ManageUser data={{ is_blocked: is_blocked, _id: _id ,name:name}} />

                      </td>
                    </>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t bg-[#5e838b]  p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
        </Typography>
        <div className="flex items-center gap-2 text-white">

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