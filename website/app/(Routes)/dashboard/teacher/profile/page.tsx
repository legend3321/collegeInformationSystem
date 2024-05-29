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
  teacher_phone: string;
  teacher_department: string;
  teacher_office: string;
  teacher_description: string;
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
    teacher_phone: "",
    teacher_department: "",
    teacher_office: "",
    teacher_description: "", // Add the missing property
  });

  async function getDetails(id: number) {
    const response = await axios.get(
      `http://localhost:8000/auth/teacher/${id}/`
    );
    console.log(response.data[0]);
    setDetails(response.data[0]);
  }

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(temp);

    getDetails(temp.id);
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
            <TableCell align="left">{details.teacher_phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Department
            </TableCell>
            <TableCell align="left">{details.teacher_department}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Office
            </TableCell>
            <TableCell align="left">{details.teacher_office}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              align="right"
              sx={{ borderRight: "1px dashed lightgrey" }}
            >
              Description
            </TableCell>
            <TableCell align="left">{details.teacher_description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
