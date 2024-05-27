"use client";
import {
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [attendence, setAttendence] = useState([]);

  async function fetchAttendence(id: number) {
    const response = await axios.post(
      `http://localhost:8000/college/attendence/student/`,
      {
        userid: id,
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      setAttendence(response.data);
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetchAttendence(user.id);
  }, []);

  return (
    <Container sx={{ py: 3, minHeight: "75vh" }}>
      <Typography variant="h4">Attendence</Typography>
      <Typography variant="body1">
        Total Attendence: {attendence.length}
      </Typography>
      <Divider sx={{ my: 3 }} />

      <Table>
        <TableBody>
          {attendence.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.subject.course_name}</TableCell>
              <TableCell>
                {item.status ? (
                  <Typography color={green[800]}>Present</Typography>
                ) : (
                  <Typography color={orange[800]}>Absent</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
