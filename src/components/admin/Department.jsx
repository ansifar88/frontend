import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NoSymbolIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { ModalDepartment } from "./ModalDepartment";
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
import { manageDepartment } from "../../api/adminApi";
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

const TABLE_HEAD = ["Name", "Description", "Status", "Actions"];

export function Department() {
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ['department'],
    queryFn: () => adminRequest.get('/department').then((res) => res.data)
  })


  const handleAction = async (departmentId) => {
    await manageDepartment(departmentId)
    queryClient.invalidateQueries("department")
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
              DEPARTMENTS
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all Departments
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <ModalDepartment />
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
              ({ departmentName, description, status, _id }, index) => {
                const isLast = index === data.data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-10">
                        {/* <Avatar src={photo ? photo : "h"} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {departmentName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >

                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status === false ? "deleted" : "a c t i v e"}
                          color={status === false ? "red" : "green"}
                        />
                      </div>
                    </td>
                    <>
                      {status === true ? (
                        <td className={classes}>
                          <Tooltip content="Delete Department">
                            <Button size="sm" color="red" className="rounded-md flex gap-3" variant="outlined" onClick={() => handleAction(_id)}>
                              <NoSymbolIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />
                              unlist
                            </Button>
                          </Tooltip>
                        </td>

                      ) : (

                        <td className={classes}>
                          <Tooltip content="Undo Delete">
                            <Button size="sm" color="green" className="rounded-md flex gap-2" variant="outlined" onClick={() => handleAction(_id)}>
                              <ArrowPathIcon strokeWidth={1.5} stroke="currentColor" className="h-4 w-4" />

                              u n d o 
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