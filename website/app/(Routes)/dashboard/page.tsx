"use client";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

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
    if (localStorage.getItem("user") == null) router.push("/login");
    else {
      const temp = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(temp);
    }
  }, []);

  return (
    <Container>
      {user?.groups[0] === 1 ? (
        <>
          <StudentDashboard />
        </>
      ) : user?.groups[0] === 2 ? (
        <>
          <TeacherDashboard />
        </>
      ) : null}
    </Container>
  );
}
