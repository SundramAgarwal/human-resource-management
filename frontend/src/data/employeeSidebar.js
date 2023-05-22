 import React from 'react'
import {FaTh,FaCommentAlt} from "react-icons/fa";
import {RxTimer} from "react-icons/rx"
import { BiImageAdd } from 'react-icons/bi';
const sideBarMenu = [
    {
        title: "Dashboard",
        icon: <FaTh/>,
        path: "/employeedashboard", 
    },
    {
        title: "Edit Profile",
        icon: <BiImageAdd/>,
        path: "/employee-edit-profile",
    },
    { 
        title: "Leave",
        icon: <RxTimer/>,
        childrens: [
            { 
                title: "Apply for leave",
                path: "/leave-form",
            },
            {
                title: "Leave Status",
                path: "/leave-status",
            },
            {
                title: "All Leaves",
                path: "/all-leave",
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