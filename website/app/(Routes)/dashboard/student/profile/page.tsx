"use client";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  groups: number[];
  email: string;
  first_name: string;
  last_name: string;
}

interface Details {
  student_phone: string;
  student_department: string;
  student_year: string;
  section: string;
  roll_number: string;
  student_description: string;
}

export default function Page() {
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    groups: [],
    email: "",
    first_name: "",
    last_name: "",
  });
  const [details, setDetails] = useState<Details>({
    student_phone: "",
    student_department: "",
    student_year: "",
    section: "",
    roll_number: "",
    student_description: "", // Add the missing property
  });

  async function getDetails(id: number, group: number) {
    if (group === 1) {
      const response = await axios.get(
        `http://localhost:8000/auth/student/${id}/`
      );
      console.log(response.data[0]);
      setDetails(response.data[0]);
    } else {
      const response = await axios.get(
        `http://localhost:8000/auth/teacher/${id}/`
      );
      console.log(response.data[0]);
      setDetails(response.data[0]);
    }
  }

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(temp);

    getDetails(temp.id, temp.groups[0]);
  }, []);

  return (
    <Container sx={{ py: 3, minHeight: "75vh" }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Username
            </TableCell>
            <TableCell align="left">{user.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              First Name
            </TableCell>
            <TableCell align="left">{user.first_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Last Name
            </TableCell>
            <TableCell align="left">{user.last_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Email
            </TableCell>
            <TableCell align="left">{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Phone Number
            </TableCell>
            <TableCell align="left">{details.student_phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Department
            </TableCell>
            <TableCell align="left">{details.student_department}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Section
            </TableCell>
            <TableCell align="left">{details.section}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Roll Number
            </TableCell>
            <TableCell align="left">{details.roll_number}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Year
            </TableCell>
            <TableCell align="left">{details.student_year}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Description
            </TableCell>
            <TableCell align="left">{details.student_description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
