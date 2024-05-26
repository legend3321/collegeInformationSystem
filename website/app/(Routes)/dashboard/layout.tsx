"use client";
import SideNav from "@/app/_components/sideNav";
import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HomeIcon from "@mui/icons-material/Home";

import { grey } from "@mui/material/colors";

const StudentLinks = [
  {
    title: "",
    path: "/",
    icon: <HomeIcon sx={{ color: grey[50] }} />,
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: <AccessTimeIcon sx={{ color: grey[50] }} />,
  },
  {
    title: "Attnedence",
    path: "/attedence",
    icon: <CalendarMonthIcon sx={{ color: grey[50] }} />,
  },
];
const TeacherLinks = [
  {
    title: "",
    path: "/",
    icon: <HomeIcon sx={{ color: grey[50] }} />,
  },
  {
    title: "Extra Class",
    path: "/extraClass",
    icon: <AddIcon sx={{ color: grey[50] }} />,
  },
  {
    title: "Students",
    path: "/students",
    icon: <PersonIcon sx={{ color: grey[50] }} />,
  },
  {
    title: "Attendence",
    path: "/attendence",
    icon: <CalendarMonthIcon sx={{ color: grey[50] }} />,
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [student, setStudent] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{'groups': [1]}");
    if (user.groups[0] === 1) setStudent(true);
  }, []);

  return (
    <>
      {children}
      <SideNav links={student ? StudentLinks : TeacherLinks} />
    </>
  );
}
