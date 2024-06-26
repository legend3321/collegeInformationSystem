"use client";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StudentDashboard from "./student/page";
import TeacherDashboard from "./teacher/page";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  groups: number[];
  date_joined?: string;
  last_login?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
}

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    groups: [],
  });

  useEffect(() => {
    router.refresh();
    if (localStorage.getItem("user") == null) router.push("/login");
    else {
      const temp = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(temp);
      console.log(temp.groups);
      if (temp.groups[0] === 1) router.push("/dashboard/student");
      else if (temp.groups[0] === 2) router.push("/dashboard/teacher");
    }
  }, []);

  return <Container></Container>;
}
