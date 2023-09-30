import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
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
  Spinner
} from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminRequest from "../../utils/adminRequest";
import { manageUser } from "../../api/adminApi";
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Name", "Status", "joined", "Actions"];

export function Users() {
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => adminRequest.get('/users').then((res) => res.data)
  })

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const handleAction = async (userId) => {
    await manageUser(userId)
    queryClient.invalidateQueries("users")
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
              USERS
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
              ({ photo, name, email, is_blocked, joinDate, _id, displaypicture }, index) => {
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
                      {is_blocked === false ? (
                        <td className={classes}>
                          <Tooltip content="Block User">
                            <Button size="sm" color="red" className="rounded-md flex gap-3" variant="outlined" onClick={() => handleAction(_id)}>
                              <NoSymbolIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />


                              block
                            </Button>
                          </Tooltip>
                        </td>
                      ) : (
                        <td className={classes}>
                          <Tooltip content="unblock User">
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
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}