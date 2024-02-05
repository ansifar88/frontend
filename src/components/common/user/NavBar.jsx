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
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end fixed">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 me-8 pl-0.5 lg:ml-auto"
        >
          <img
            className="border border-gray-900 p-0.5 h-10 w-112"
            src={dp} />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-5 w-5 transition-transform text-white ${isMenuOpen ? "rotate-180" : ""
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
  const navigate = useNavigate()

  return (
    <navbar className={`lg:rounded-none   fixed top-0 left-0 right-0 bg-[#023E8A] z-50`}>
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
          <div className="feature ">
            <div
              onClick={() => navigate('/doctors')}
              className=" flex items-center cursor-pointer"
            >
              <p
                className={`featureItem`}
              >
                Doctors
              </p>
            </div>
            <div
              onClick={() => navigate('/appointments')}
              className=" flex items-center cursor-pointer  "
            >
              <p
                className={`  featureItem`}
              >
                Appointments
              </p>
            </div >
            <div
              onClick={() => navigate('/chats')}
              className=" flex items-center cursor-pointer "
            >
              <p
                className={`featureItem`}
              >
                Chats
              </p>
            </div>
          </div>
        </div>
        <ProfileMenu />
      </div>
    </navbar>
  );
}