import React from "react";
import dp from '../../../logos/dp.png'
import { useDispatch } from "react-redux";
import { Logoutdetails } from "../../../Redux/UserSlice";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { Sidebar } from "../user/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function MenuLists() {
  const { userInfo } = useSelector(state => state.user)
  const id = userInfo.id
  const navigate = useNavigate()

  const profileNavigate = async () => {
    navigate('/profile/', { state: { id } })
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

  // const { doctorInfo } = useSelector(state => state.doctor)
  // const displaypicture = doctorInfo.displaypicture

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
            src={ dp} />
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

// nav list menu




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
    <navbar className="  lg:rounded-none   fixed top-0 left-0 right-0 bg-[#023E8A] z-50">

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
        <Bars3Icon onClick={openDrawer} className="h-8 w-8 ms-5 cursor-pointer text-white" />
        <img src="../../../public/logoImages/logonobackground.png" alt="" className="h-14 ps-7 py-1" />
        {/* <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
         
        </div> */}
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