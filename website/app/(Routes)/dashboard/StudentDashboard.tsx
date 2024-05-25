import NewStudent from "@/app/_components/newStudent";
import Schedule from "@/app/_components/schedule";
import { Box } from "@mui/material";
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

  const fetchData = async (id: string) => {
    const response = await axios.get(
      `http://localhost:8000/auth/student/${id}/`
    );

    if (response.status === 200) {
      setNewUser(false);
    } else if (response.status === 204) {
      setNewUser(true);
    }
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(temp);
    fetchData(temp.id);
  }, []);
  return (
    <Box sx={{ py: 3 }}>
      {newUser ? <NewStudent /> : <Schedule userId={user.id} />}
    </Box>
  );
}
