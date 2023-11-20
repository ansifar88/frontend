import React, { useState } from "react";
import dp from '../../../logos/dp.png'
import vclogo from '../../../logos/logonobackground.png'
import { useDispatch } from "react-redux";
import { Logoutdetails } from "../../../Redux/UserSlice";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Drawer,
  Tooltip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  UserGroupIcon,
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon
} from "@heroicons/react/24/outline";
import { Sidebar } from "../user/Sidebar";
import { useNavigate } from "react-router-dom";

function MenuLists() {
  const navigate = useNavigate()

  const profileNavigate = async () => {
    navigate('/profile')
  }
  const dispatch = useDispatch()

  const handleLogout = async () => {
    localStorage.removeItem("currentUser")
    dispatch(Logoutdetails({
      userInfo: {}
    }))
    navigate('/login')
  }
  return (
    <MenuList className="p-1">
      <MenuItem className="flex gap-4" onClick={profileNavigate}>
        <UserCircleIcon className="h-5 w-5" />
        My Profile
      </MenuItem>
      <MenuItem className="flex gap-4 text-red-600 hover:text-red-900" onClick={handleLogout}>
        <PowerIcon className="h-5 w-5" />
        Sign Out
      </MenuItem>
    </MenuList>
  )
}

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 me-8 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={dp} />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuLists />
    </Menu>
  );
}

export function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [isHoveredDoctor, setIsHoveredDoctor] = useState(false);
  const [isHoveredAppointments, setIsHoveredAppointments] = useState(false);
  const [isHoveredChats, setIsHoveredChats] = useState(false);
  const toggleHoverDoctor = () => {
    setIsHoveredDoctor(!isHoveredDoctor);
  };

  const toggleHoverAppointments = () => {
    setIsHoveredAppointments(!isHoveredAppointments);
  };

  const toggleHoverChats = () => {
    setIsHoveredChats(!isHoveredChats);
  };
  const navigate = useNavigate()

  return (
    <navbar className={`  lg:roun  ded-none   fixed top-0 left-0 right-0 bg-[#023E8A] z-50`}>
      <div className="relative mx-auto flex items-center text-blue-gray-900 py-3 bg-[#023E8A] ">
        <Drawer open={open} onClose={closeDrawer} className="bg-[#09264b]">
          <div className="mb-2 flex items-center justify-between p-4 ">
            <Typography variant="h5" color="white">
              VIRTUAL CARE
            </Typography>
            <IconButton variant="text" color="white" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <Sidebar />
        </Drawer>
        <div className="visible md:invisible">
          <Bars3Icon onClick={openDrawer} className="h-8 w-8 ms-5 cursor-pointer text-white  " />
        </div>
        <Tooltip content="Home" placement="bottom-end">

          <img src={vclogo} alt="vc logo" className="h-14 ps-7 py-1 cursor-pointer" onClick={() => navigate("/")} />
        </Tooltip>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
        </IconButton>
        <div className="w-full flex justify-around">
          <div className="flex justify-between w-[40rem]  invisible md:visible">
            <Button variant="text"
              onClick={() => navigate('/doctors')}
              className=" flex items-center"
              onMouseEnter={toggleHoverDoctor}
              onMouseLeave={toggleHoverDoctor}
            >
              <UserGroupIcon
                className={`w-6 h-6 text-white me-3 absolute ${isHoveredDoctor ? 'opacity-100' : 'opacity-0'
                  }`}
              />
              <Typography
                className={`text-white text-lg ${isHoveredDoctor ? 'ml-8' : 'ml-auto'} transition-all`}
              >
                Doctors
              </Typography>
            </Button>
            <Button variant="text"
              onClick={() => navigate('/appointments')}
              className=" flex items-center "
              onMouseEnter={toggleHoverAppointments}
              onMouseLeave={toggleHoverAppointments}
            >
              <DocumentCheckIcon
                className={`w-6 h-6 text-white me-3 absolute ${isHoveredAppointments ? 'opacity-100' : 'opacity-0'
                  }`}
              />
              <Typography
                className={`text-white text-lg ${isHoveredAppointments ? 'ml-8' : 'ml-auto'} transition-all`}
              >
                Appointments
              </Typography>
            </Button >

            <Button variant="text"
              onClick={() => navigate('/chats')}
              className=" flex items-center"
              onMouseEnter={toggleHoverChats}
              onMouseLeave={toggleHoverChats}
            >
              < ChatBubbleLeftRightIcon
                className={`w-6 h-6 text-white me-3 absolute ${isHoveredChats ? 'opacity-100' : 'opacity-0'
                  }`}
              />
              <Typography
                className={`text-white text-lg ${isHoveredChats ? 'ml-8' : 'ml-auto'} transition-all`}
              >
                Chats
              </Typography>
            </Button>
          </div>
        </div>
        <ProfileMenu />
      </div>
    </navbar>
  );
}