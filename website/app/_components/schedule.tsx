import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ScheduleCard from "./scheduleCard";
import { motion } from "framer-motion";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Schedule(userId: { userId: number }) {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [day, setDay] = useState(DAYS[new Date().getDay()]);

  const getSchedule = async (day: string) => {
    const response = await axios.post(
      `http://localhost:8000/college/schedule/`,
      {
        userid: userId.userId,
        day: day,
      }
    );

    if (response.status === 200) {
      setSchedule(response.data);
      console.log(response.data);
    } else if (response.status === 204) {
      setSchedule([]);
      console.log("No schedule for today");
    }
  };

  return (
    <Box>
      <Typography variant="h6">
        Schedule for{" "}
        <TextField
          variant="standard"
          value={day}
          onChange={(e) => {
            setDay(e.target.value);
            getSchedule(e.target.value);
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
      <Grid container sx={{ py: 5 }}>
        {schedule.length === 0 ? (
          <></>
        ) : (
          schedule.map((item, index) => (
            <Grid item key={index} xs={12} md={3}>
              <ScheduleCard schedule={item} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
