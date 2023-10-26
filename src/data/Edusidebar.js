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
        icon: UilUser,
        heading: 'Profile',
        route: "/educator/profile",
    },
    {
        icon: UilSignOutAlt,
        heading: 'Logout',
        route: "/educator/logout",
    },
];

export const SidebarDataForStudent = [
    {
        icon: UilEstate,
        heading: "Dashboard",
        route: "/student/dashboard",
    },
    {
        icon: UilBookAlt,
        heading: "View Courses",
        route: "/student/view-courses",
    },
    {
        icon: UilPlus,
        heading: "Enrolled Courses",
        route: "/student/enrolled-courses",
    },
    {
        icon: UilUser,
        heading: 'Profile',
        route: "/student/profile",
    },
    {
        icon: UilSignOutAlt,
        heading: 'Logout',
        route: "/student/logout",
    },
];