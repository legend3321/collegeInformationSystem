"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddSection() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8000/auth/department/"
      );

      if (response.status === 200) setDepartments(response.data);
      else console.log(response.data);
    }
    fetchData();
  }, []);

  async function handleSubmit() {
    setError("");
    if (name === "" || capacity === "" || department === "" || semester === "")
      return setError("All fields are required");
    const user = JSON.parse(localStorage.getItem("user") || "{'id': ''}");

    const teacher = await axios.get(
      `http://localhost:8000/auth/teacher/${user.id}/`
    );

    const response = await axios.post("http://localhost:8000/auth/section/", {
      section_name: name,
      section_capacity: capacity,
      section_department: department,
      section_semester: semester,
      section_instructor: teacher.data[0].id,
    });

    if (response.status === 200) {
      router.refresh();
    } else {
      setError("An error occurred. Please try again.");
    }
  }

  return (
    <Container sx={{ py: 3 }}>
      <Grid container alignItems={"center"} justifyContent={"space-around"}>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{
            height: { xs: "200px", md: "100%" },
            overflow: "hidden",
            borderRadius: { xs: 0, md: 10 },
          }}
        >
          <Box
            component={"img"}
            src={"/pattern/Linth.png"}
            alt={"login"}
            sx={{
              width: { xs: "100%", md: "auto" },
              height: { xs: "auto", md: "50vh" },
            }}
          />
        </Grid>
        <Grid item md={6} xs={12} sx={{ mt: { xs: 5, md: 0 } }}>
          <Typography variant="h4">Add a section</Typography>
          <Typography variant="body1">
            Assign yourself by adding a section to your department
          </Typography>
          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth>
            <TextField
              id="department"
              label="Department"
              value={department}
              select
              onChange={(e) => setDepartment(e.target.value)}
              required
              sx={{ mb: 2 }}
            >
              {(
                departments as {
                  department_id: number;
                  department_name: string;
                  department_description: string;
                }[]
              ).map((department) => (
                <MenuItem
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.department_name} |{" "}
                  {department.department_description}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Section Name"
              variant="outlined"
              placeholder="This will be displayed along with the department name in the section list."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              type="number"
              value={capacity}
              label="Capacity"
              placeholder="Total Number of Students in the section"
              onChange={(e) => setCapacity(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="off"
              required
            />

            <TextField
              variant="outlined"
              type="number"
              label="Semester"
              placeholder="Semester Number of the section"
              autoComplete="off"
              value={semester}
              onChange={(e) => {
                parseInt(e.target.value) < 1 || parseInt(e.target.value) > 8
                  ? setSemester("1")
                  : setSemester(e.target.value);
              }}
              sx={{ mb: 2 }}
              required
            />
            <Divider sx={{ my: 2 }} />
            <Button
              variant="contained"
              color="primary"
              sx={{ py: 2 }}
              onClick={handleSubmit}
            >
              <Typography variant="button">Submit</Typography>
            </Button>
            <Typography
              variant="caption"
              textAlign={"center"}
              color={"error"}
              sx={{ mt: 2 }}
            >
              {error}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
