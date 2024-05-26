"use client";
import { Box, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TeacherDashboard() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{'id': ''}");
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/auth/teacher/section/${user.id}`
        );
        if (response.status === 204) {
          router.push("/dashboard/teacher/addSection");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return <Container sx={{ py: 3 }}></Container>;
}
