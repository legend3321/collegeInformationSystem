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
} from "@mui/material";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import axios from "axios";

export default function NewStudent() {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const [roll_number, setRoll_number] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [student_description, setStudent_description] = useState("");

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

  return (
    <Box sx={{ py: 3 }}>
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
              height: { xs: "auto", md: "90vh" },
            }}
          />
        </Grid>
        <Grid item md={6} xs={12} sx={{ mt: { xs: 5, md: 0 } }}>
          <Typography variant="h4">Add Your details</Typography>
          <Typography variant="body1">
            This Step is needed only when you are visiting here first time
          </Typography>
          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth>
            <motion.div
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="body2" sx={{ mb: 2 }}>
                Note: If Your Section is not Displayed here means that your
                class coordinator has not added your section yet.
              </Typography>
            </motion.div>
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
              select
              id="section"
              label="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              sx={{ mb: 2 }}
            >
              <MenuItem key="A" value={10}>
                A
              </MenuItem>
              <MenuItem key="B" value={20}>
                B
              </MenuItem>
              <MenuItem key="C" value={30}>
                C
              </MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              type="number"
              value={roll_number}
              label="Roll Number"
              placeholder="Enter Your Class Roll Number Here"
              onChange={(e) => setRoll_number(e.target.value)}
              sx={{ mb: 2 }}
              autoComplete="off"
              required
            />

            <TextField
              variant="outlined"
              type="number"
              label="Semester"
              placeholder="Current Semester you are in"
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
            <TextField
              variant="outlined"
              type="number"
              label="Year"
              placeholder="Year of Admission YYYY"
              value={year}
              onChange={(e) => {
                parseInt(e.target.value) < 2010 ||
                parseInt(e.target.value) > new Date().getFullYear()
                  ? setYear("2010")
                  : setYear(e.target.value);
              }}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              variant="outlined"
              type="number"
              label="Phone Number"
              value={phone_number}
              onChange={(e) => {
                e.target.value.length > 10
                  ? setPhone_number(phone_number.slice(0, 10))
                  : setPhone_number(e.target.value);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              label="Description"
              value={student_description}
              onChange={(e) => setStudent_description(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" sx={{ py: 2 }}>
              <Typography variant="button">Submit</Typography>
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
