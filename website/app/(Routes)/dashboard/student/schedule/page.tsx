"use client";
import {
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ScheduleCard from "@/app/_components/scheduleCard";
import dayjs from "dayjs";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Schedule() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [day, setDay] = useState(DAYS[new Date().getDay()]);
  const [user, setUser] = useState<any>(localStorage.getItem("user"));
  const [index, setIndex] = useState(0);
  const [extraClasses, setExtraClasses] = useState<any[]>([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(temp);
    getSchedule(day, temp.id);
  }, [day]);

  const getExtraSclass = async (id: number) => {
    console.log(dayjs().add(index, "day").format("YYYY-MM-DD"));
    const response = await axios.post(
      `http://localhost:8000/college/section/extraclass/`,
      {
        userid: id,
        day: dayjs().add(index, "day").format("YYYY-MM-DD"),
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      setExtraClasses(response.data);
    } else if (response.status === 204) {
      setExtraClasses([]);
      console.log("No Extra class for today");
    }
  };

  const getSchedule = async (day: string, id: number) => {
    const response = await axios.post(
      `http://localhost:8000/college/schedule/`,
      {
        userid: id,
        day: day,
      }
    );

    if (response.status === 200) {
      setSchedule(response.data);
    } else if (response.status === 204) {
      setSchedule([]);
      console.log("No schedule for today");
    }
  };

  return (
    <Container sx={{ py: 3, minHeight: "75vh" }}>
      <Typography variant="h6" textAlign={"center"}>
        Schedule for{" "}
        <TextField
          variant="standard"
          value={day}
          onChange={(e) => {
            // console.log(DAYS.indexOf(e.target.value));
            setIndex(DAYS.indexOf(e.target.value));
            setDay(e.target.value);
            getSchedule(e.target.value, user.id);
            getExtraSclass(user.id);
          }}
          select
          sx={{ ml: 1, width: 200, fontSize: 20 }}
        >
          {DAYS.map((day, index) => (
            <MenuItem key={index} value={day} sx={{ px: 5 }}>
              {day}
            </MenuItem>
          ))}
        </TextField>
      </Typography>
      <Grid container sx={{ py: 5 }} columnSpacing={10}>
        {extraClasses.length === 0 ? (
          <></>
        ) : (
          extraClasses.map((item, index) => (
            <Grid item key={index} xs={12} md={4}>
              <ScheduleCard schedule={item} extra={true} />
            </Grid>
          ))
        )}
        {schedule.length === 0 ? (
          <></>
        ) : (
          schedule.map((item, index) => (
            <Grid item key={index} xs={12} md={4}>
              <ScheduleCard schedule={item} extra={false} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
