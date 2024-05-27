"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const router = useRouter();

  const [attendence, setAttendence] = useState<
    {
      student: number;
      status: boolean;
    }[]
  >([] as { student: number; status: boolean }[]);

  const addAttendence = async () => {
    const response = await axios.post(
      "http://localhost:8000/college/attendence/",
      {
        section: section,
        attendence: attendence,
        subject: course,
      }
    );
    if (response.status === 201) {
      router.push("/dashboard/teacher/");
    }
  };

  const handleAttendence = (
    event: React.MouseEvent<HTMLElement>,
    newAttendence: { student: number; status: boolean }
  ) => {
    setAttendence((attendence) => [...attendence, newAttendence]);
  };

  async function get_students(section: string) {
    setStudents([]);
    const response = await axios.get(
      `http://localhost:8000/auth/section/students/${section}/`
    );
    if (response.status === 200) {
      setStudents(response.data);
    }
  }

  async function get_courses(department: string) {
    setCourses([]);
    const response = await axios.get(
      `http://localhost:8000/auth/department/course/${department}/`
    );
    if (response.status === 200) {
      setCourses(response.data);
    }
  }

  async function get_sections(department: string) {
    setSections([]);
    const response = await axios.get(
      `http://localhost:8000/auth/department/section/${department}/`
    );
    if (response.status === 200) {
      setSections(response.data);
    }
  }

  async function get_departments() {
    const response = await axios.get("http://localhost:8000/auth/department/");
    if (response.status === 200) {
      setDepartments(response.data);
    }
  }

  useEffect(() => {
    get_departments();
  }, []);

  return (
    <Container sx={{ py: 3, minHeight: "90vh" }}>
      <Typography variant="h3">Add Attendence</Typography>
      <Typography variant="body1">
        Don't forget to click <Button color="success">Add Attendence</Button> at
        last
      </Typography>
      <Typography variant="subtitle1">
        Attendence will be marked for {dayjs().format("DD-MM-YYYY")}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <TextField
        label="Department"
        value={department}
        sx={{ mb: 2 }}
        onChange={(e) => {
          setDepartment(e.target.value);
          get_sections(e.target.value);
          get_courses(e.target.value);
        }}
        select
        fullWidth
      >
        {(
          departments as {
            department_id: number;
            department_name: string;
          }[]
        ).map((department) => (
          <MenuItem
            key={department.department_id}
            value={department.department_id}
          >
            {department.department_name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Section"
        value={section}
        onChange={(e) => {
          setSection(e.target.value);
          get_students(e.target.value);
        }}
        sx={{ mb: 2 }}
        select
        fullWidth
      >
        {(
          sections as {
            section_id: number;
            section_name: string;
            section_department: string;
            section_semester: string;
          }[]
        ).map((section) => (
          <MenuItem key={section.section_id} value={section.section_id}>
            {section.section_name} | {section.section_department} |{" "}
            {section.section_semester}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Course"
        value={course}
        onChange={(e) => {
          setCourse(e.target.value);
        }}
        sx={{ mb: 2 }}
        select
        fullWidth
      >
        {(
          courses as {
            course_id: number;
            course_name: string;
            course_description: string;
          }[]
        ).map((course) => (
          <MenuItem key={course.course_id} value={course.course_id}>
            {course.course_name} | {course.course_description}
          </MenuItem>
        ))}
      </TextField>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" align="right">
                Roll No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Attendence</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(
            students as {
              id: number;
              student_id: { first_name: string; last_name: string };
              roll_number: number;
            }[]
          ).map((student, index: number) => (
            <TableRow key={student.id}>
              <TableCell>
                <Typography variant="body1" align="right">
                  {student.roll_number}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  {student.student_id.first_name +
                    " " +
                    student.student_id.last_name}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <ToggleButtonGroup
                  value={attendence[index]}
                  exclusive
                  onChange={handleAttendence}
                >
                  <ToggleButton
                    value={{ student: student.id, status: true }}
                    color="success"
                    aria-label="present"
                  >
                    Present
                  </ToggleButton>
                  <ToggleButton
                    value={{ student: student.id, status: false }}
                    color="error"
                    aria-label="absent"
                  >
                    Absent
                  </ToggleButton>
                </ToggleButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button color="success" sx={{ ml: "auto" }} onClick={addAttendence}>
          Add Attendence
        </Button>
      </Box>
    </Container>
  );
}
