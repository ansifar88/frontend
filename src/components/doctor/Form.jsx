import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
   Option,
   Textarea,
   Spinner
} from "@material-tailwind/react";
import adminRequest from "../../utils/adminRequest";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export function Form() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  const queryClient = useQueryClient()
  const {isLoading , error, data } = useQuery({
    queryKey:['department'],
    queryFn :() => adminRequest.get('/department').then((res) => res.data )
    
  })
  if(isLoading){
    return <div ><Spinner color="blue" className="h-10 w-10 " /></div>
  }
  if(error){
    return <h1>Something went Wrong</h1>
  }
  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Complete Profile
      </Button>
      <Dialog open={open} handler={handleOpen} size="sm" className="rounded-none">
        <form>
        <DialogHeader>COMPLETE PROFILE AND VERIFY</DialogHeader>
        <DialogBody className="flex justify-center ">
        <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-4">
          <Input size="lg" variant="standard" label="Current Hospital" />
        <div className="flex items-center gap-2">

          <Input size="lg" type="file" variant="standard" label="Display Picture" />

        
        
        <Select variant="standard" label="Select Department">
      {data.data.map((department)=>(
            <Option key={department._id}>{department.departmentName}</Option>
            
      ))
        }
      </Select>
        </div>
      <div className="flex justify-between gap-2">

          <Input size="lg" variant="standard" label="Qualification" />
          <Input size="lg" variant="standard" label="experience" />
      </div>
          <Textarea size="lg" variant="standard" label="Description" />
          <Typography># a short description about you .</Typography>
          <Input size="lg" type="file" variant="standard" label="certificates" />
          <Typography># Upload All of your Certificates including experience and Graduation .</Typography>
        </div>
        </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}