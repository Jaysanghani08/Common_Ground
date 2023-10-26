// Sidebar imports
import {
    UilEstate,
    UilBookAlt,
    UilPlus,
    UilUser,
    UilSignOutAlt,
  } from "@iconscout/react-unicons";

  // Sidebar Data
export const SidebarData = [
    {
      icon: UilEstate,
      heading: "Dashboard",
      route: "/educator/dashboard",
    },
    {
      icon: UilBookAlt,
      heading: "Offered Courses",
      route: "/educator/offered-courses",
    },
    {
      icon: UilPlus,
      heading: "Create Courses",
      route: "/educator/create-course",
    },
    {
      icon:  UilUser,
      heading: 'Profile',
      route: "/educator/profile",
    },
    {
      icon: UilSignOutAlt,
      heading: 'Logout',
      route: "/educator/logout",
    },
  ];