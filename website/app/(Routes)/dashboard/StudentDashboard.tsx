import NewStudent from "@/app/_components/newStudent";
import { Box } from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";

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

export default function StudentDashboard() {
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    groups: [],
  });

  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const temp = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(temp);

      const response = await axios.get(
        `http://localhost:8000/auth/student/${user.id}/`
      );

      if (response.status === 200) {
        console.log(response.data);
      } else if (response.status === 204) {
        setNewUser(true);
      }
    };

    fetchData();
  }, []);
  return <Box sx={{ py: 3 }}>{newUser ? <NewStudent /> : "Student"}</Box>;
}
