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
    UserGroupIcon,
    BellIcon,
    AcademicCapIcon
  } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
   
  export function Sidebar() {
    const navigate = useNavigate()


    return (
      <Card className="h-[calc(100vh-2rem)]  w-full fixed bg-[#2c7c8d] rounded-none max-w-[18.7rem] p-4 text-red shadow-xl shadow-blue-gray-900/5">
        
        <List className="text-white mt-8">
          <ListItem onClick={() => navigate('/admin')}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={() => navigate('/admin/doctors')}>
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
          <ListItem onClick={() => navigate('/admin/notifications')} >
            <ListItemPrefix>
              <BellIcon className="h-5 w-5" />
            </ListItemPrefix>
            Notifications
            <ListItemSuffix>
              {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={() => navigate('/admin/departments')}>
            <ListItemPrefix>
              <AcademicCapIcon className="h-5 w-5" />
            </ListItemPrefix>
            Departments
          </ListItem>
         
        </List>
      </Card>
    );
  }