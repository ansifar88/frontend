import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


export function Success() {
    const navigate = useNavigate()
  return (
    <>
      <Typography variant="h1">SUCCESS</Typography>
      <Button onClick={() => navigate("/doctors")}>back</Button>
    </>
  )
}


