"use client";
import ScheduleCard from "@/app/_components/scheduleCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const router = useRouter();
  const [extraClasses, setExtraClasses] = useState([]);

  async function fetchData(id: number) {
    try {
      const response = await axios.get(
        `http://localhost:8000/auth/teacher/section/${id}`
      );
      if (response.status === 204) {
        router.push("/dashboard/teacher/addSection");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getExtraClasses(id: number) {
    try {
      const response = await axios.post(
        `http://localhost:8000/college/teacher/extraclass/`,
        {
          userid: id,
        }
      );
      if (response.status === 200) {
        setExtraClasses(response.data);
      } else {
        console.log("No extra classes found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{'id': ''}");
    fetchData(user.id);
    getExtraClasses(user.id);
  }, []);

  return (
    <Container sx={{ py: 3, minHeight: "75vh" }}>
      {extraClasses.length !== 0 ? (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4">Extra Classes</Typography>
        </Box>
      ) : (
        <></>
      )}

      <Grid container spacing={3}>
        {extraClasses.length === 0 ? (
          <></>
        ) : (
          extraClasses.map((item, index) => (
            <Grid item key={index} xs={12} md={4}>
              <ScheduleCard schedule={item} extra={true} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
