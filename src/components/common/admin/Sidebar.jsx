import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    UserGroupIcon
  } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
   
  export function Sidebar() {
    const navigate = useNavigate()

    const handleLogout = async()=>{
      localStorage.removeItem("currentAdmin")
      navigate('/admin/login')
    }
    return (
      <Card className="h-[calc(100vh-2rem)]  w-full fixed bg-[#2c7c8d] rounded-none max-w-[18.7rem] p-4 text-red shadow-xl shadow-blue-gray-900/5">
        
        <List className="text-white mt-8">
          <ListItem onClick={() => navigate('/admin')}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Doctors
          </ListItem>
          <ListItem onClick={() => navigate('/admin/users')}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Departments
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }