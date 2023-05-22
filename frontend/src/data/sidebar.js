import React from 'react'
import {FaTh,FaRegChartBar,FaCommentAlt} from "react-icons/fa";
import {RxTimer} from "react-icons/rx"
import { BiImageAdd } from 'react-icons/bi';
import { ImUserCheck } from 'react-icons/im';
const sideBarMenu = [
    {
        title: "Dashboard",
        icon: <FaTh/>,
        path: "/dashboard", 
    },
    {
        title: "Add Employee",
        icon: <BiImageAdd/>,
        path: "/add-employee",
    },
    {
        title: "Account",
        icon: <FaRegChartBar/>,
        childrens: [
            {
                title: "Profile",
                path: "/profile",
            },
            {
                title: "Edit Profile",
                path: "/edit-profile",
            },
        ],
    },
    {
        title: "Attendance",
        icon:   <ImUserCheck/>,
        childrens: [
            {
                title: "Mark Attendance",
                path: "/mark-attendance",
            },
            {
                title: "View Attendance",
                path: "/view-attendance",
            },
        ],
    },
    {
        title: "Leave",
        icon:   <RxTimer/>,
        childrens: [
            {
                title: "Leave Applications",
                path: "/leave-applications",
            },
            {
                title: "All Applications",
                path: "/all-applications",
            },
        ],
    },
    {
        title: "Report Bug",
        icon: <FaCommentAlt/>,
        path: "/contact-us",
    },
];

export default sideBarMenu;