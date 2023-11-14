import React from "react";
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
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import vclogo from '../../../logos/logonobackground.png'
function MenuLists() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    localStorage.removeItem("currentAdmin")
    navigate('/admin/login')
  }
  return (
    <MenuList className="p-1">
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
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
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

  return (
    <navbar className="  lg:rounded-none   fixed top-0 left-0 right-0 bg-[#48CAE4] z-50">
      <div className="relative mx-auto flex items-center text-blue-gray-900 py-3 bg-[#1b4f5a] ">
        <Drawer open={open} onClose={closeDrawer} className="bg-[#5d7582] ">
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
        <Bars3Icon onClick={openDrawer} className="h-8 w-8 ms-5 cursor-pointer text-white visible md:invisible" />
        <img src={vclogo} alt="" className="h-14 ps-7 py-1 md:-ms-10" />
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
        </IconButton>
        <ProfileMenu />
      </div>
    </navbar>
  );
}