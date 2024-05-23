import AddSection from "@/app/_components/addSection";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{'id': ''}");
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/auth/teacher/section/${user.id}`
        );
        console.log(response);
        if (response.status === 200) {
          setIsInstructor(true);
        } else {
          setIsInstructor(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ py: 3 }}>{isInstructor ? "Instructor" : <AddSection />}</Box>
  );
}
