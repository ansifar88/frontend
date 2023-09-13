import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
   
  function Banner() {
    return (
        <Card
        shadow={false}
        className="relative grid h-[40rem] w-full rounded-none items-end justify-center overflow-hidden text-center"
      >
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="inset-0 m-0  rounded-none lg:w-[94.95rem] h-[40rem] bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')]"
        >
            
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/50 via-black/50" />
          <div className="flex justify-end items-center h-full">

          <Typography
            variant="h1"
            color="white"
            className="mb-12 font-sans leading-[1.5] z-10 text-right pe-16"
            >
            Where Care <br/>
            Knows No Boundaries
          </Typography>
              </div>

        </CardHeader>

      </Card>
      
    );
  }
  export default Banner