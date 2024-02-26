import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import './Banner.css'
function Banner() {
  return (
    <Card
      shadow={false}
      className="relative  h-screen w-[98.9vw] rounded-none items-end justify-center overflow-hidden text-center -mt-20"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="inset-0 m-0  rounded-none w-[98.9vw] h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')]"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/50 via-black/50" />
        <div className="flex   justify-end items-center h-full">
          <Typography
            color="white"
            className="mb-12 animate-showcontent font sm:text-2xl md:text-5xl font-sans leading-[1.5] z-10 text-right pe-16"
          >
            Bringing Quality Healthcare to <br /> Your Doorstep
          </Typography>
        </div>
      </CardHeader>
    </Card>
  );
}
export default Banner










