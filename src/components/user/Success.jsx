import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline"

export function Success() {
  const navigate = useNavigate()
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="p-5 h-96 flex flex-col justify-center items-center bg-transparent">
          <CheckCircleIcon className="h-20 w-20 md:h-52 md:w-52 text-green-500" />
         
          <Typography variant="h3" className="text-green-500">YOUR SLOT IS BOOKED SUUCESSFULLY</Typography>
          <Typography variant="h5" className="m-3">thank you for choosing us </Typography>
          <Button variant="outlined" color="blue" onClick={() => navigate("/doctors")}>take me to home </Button>
        </div>
      </div>
    </>
  )
}


