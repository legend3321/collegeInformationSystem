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
import { useRouter } from "next/navigation";

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

export default function NewStudent() {
  const [departments, setDepartments] = useState([]);
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const [roll_number, setRoll_number] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [student_description, setStudent_description] = useState("");

  const [user, setUser] = useState({
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    groups: [],
  });
  const [maxStudents, setMaxStudents] = useState(0);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(temp);
    if (temp.id) setYear("20" + temp.username.slice(0, 2));
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8000/auth/department/"
      );

      if (response.status === 200) setDepartments(response.data);
      else console.log(response.data);
    }
    fetchData();
  }, []);

  async function getSections(dept: string) {
    setSections([]);
    const response = await axios.get(
      `http://localhost:8000/auth/department/section/${dept}/`
    );
    if (response.status === 200) {
      setSections(response.data);
    } else {
      setError("Something Went Wrong");
    }
  }

  async function handleSubmit() {
    setError("");
    if (!department || !section || !roll_number || !year || !semester) {
      setError("All feilds markes as * are required");
    }

    try {
      const response = await await axios.post(
        "http://127.0.0.1:8000/auth/student/",
        {
          student_id: user.id,
          student_department: department,
          section: section,
          roll_number: roll_number,
          student_semester: semester,
          student_year: year,
          student_phone: phone_number,
          student_description: student_description,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        router.refresh();
      } else if (response.status === 400) {
        console.log(response.data);
        setError("An error occurred. Please try again later.");
      }
    } catch (e) {
      console.log(e);
      setError("An error occurred. Please try again later.");
      return;
    }
  }

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
              height: { xs: "auto", md: "70vh" },
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
            <TextField
              id="department"
              label="Department"
              value={department}
              select
              onChange={(e) => {
                setDepartment(e.target.value);
                getSections(e.target.value);
              }}
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
              onChange={(e) => {
                setSection(e.target.value);
                const selectedSection = sections.find(
                  (sec: { section_id: number }) =>
                    sec.section_id === parseInt(e.target.value)
                );
                if (selectedSection) {
                  setMaxStudents(
                    (selectedSection as { section_capacity: number })
                      .section_capacity
                  );
                  setSemester(
                    (selectedSection as { section_semester: string })
                      .section_semester
                  );
                }
              }}
              required
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              sx={{ mb: 2 }}
            >
              {(
                sections as {
                  section_id: number;
                  section_name: string;
                  section_semester: string;
                }[]
              ).map((section) => (
                <MenuItem key={section.section_id} value={section.section_id}>
                  {section.section_name} | {section.section_semester} sem
                </MenuItem>
              ))}
            </TextField>
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
              variant="outlined"
              type="number"
              value={roll_number}
              label="Roll Number"
              placeholder="Enter Your Class Roll Number Here"
              onChange={(e) => {
                if (parseInt(e.target.value) > maxStudents)
                  setRoll_number(maxStudents.toString());
                else if (parseInt(e.target.value) < 1) setRoll_number("1");
                else setRoll_number(e.target.value);
              }}
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
              select
              onChange={(e) => {
                setYear(e.target.value);
              }}
              sx={{ mb: 2 }}
              required
            >
              {Array.from(
                { length: new Date().getFullYear() - 2015 + 1 },
                (_, index) => (
                  <MenuItem key={index} value={2015 + index}>
                    {2015 + index}
                  </MenuItem>
                )
              )}
            </TextField>
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
            <Button
              variant="contained"
              color="primary"
              sx={{ py: 2 }}
              onClick={handleSubmit}
            >
              <Typography variant="button">Submit</Typography>
            </Button>
            <Typography
              variant="body1"
              textAlign={"center"}
              color="error"
              sx={{ my: 2 }}
            >
              {error}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
