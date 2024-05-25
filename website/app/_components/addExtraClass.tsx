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
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const START_TIMES = [
  "08:00:00",
  "08:55:00",
  "10:10:00",
  "11:05:00",
  "12:00:00",
  "13:00:00",
  "13:55:00",
  "15:10:00",
  "16:00:00",
  "16:55:00",
];

const END_TIMES = [
  "08:55:00",
  "09:50:00",
  "11:05:00",
  "12:00:00",
  "12:55:00",
  "13:55:00",
  "14:50:00",
  "16:00:00",
  "16:55:00",
  "17:50:00",
];

const MARKS = [
  {
    value: 0,
    label: "08:00",
  },
  {
    value: 10,
    label: "09:00",
  },
  {
    value: 20,
    label: "10:10",
  },
  {
    value: 30,
    label: "11:10",
  },
  {
    value: 40,
    label: "12:00",
  },
  {
    value: 50,
    label: "01:00",
  },
  {
    value: 60,
    label: "02:00",
  },
  {
    value: 70,
    label: "03:10",
  },
  {
    value: 80,
    label: "04:00",
  },
  {
    value: 90,
    label: "05:00",
  },
  {
    value: 100,
    label: "06:00",
  },
];

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AddExtraClass() {
  const [error, setError] = useState("");
  const [time, setTime] = useState([0, 10]);
  const [dateValue, setDateValue] = useState(dayjs());
  const [course, setCourse] = useState("");
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");

  const [user, setUser] = useState({ id: 0 });
  const router = useRouter();

  const isSunday: (date: dayjs.Dayjs) => boolean = (date) => date.day() === 0; // Check for Sunday (0-indexed)

  const shouldDisableDate: (date: dayjs.Dayjs) => boolean = (date) => {
    return isSunday(date); // Disable Sundays and past dates
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(temp);
    getCourses();
    getSections(temp.id);
  }, []); // Run only once

  async function getCourses() {
    const response = await axios.get("http://localhost:8000/auth/course/");
    if (response.status === 200) {
      setCourses(response.data);
    } else if (response.status === 204) {
      setError("No courses found");
    }
  }
  async function getSections(teach_id: number) {
    const response = await axios.get(
      `http://localhost:8000/auth/teacher/department/section/${teach_id}`
    );
    if (response.status === 200) {
      setSections(response.data);
    } else if (response.status === 204) {
      setError("No Section found");
    }
  }

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setTime([Math.min(newValue[0], time[1] - 10), time[1]]);
    } else {
      setTime([time[0], Math.max(newValue[1], time[0] + 10)]);
    }
  };

  async function handleSubmit() {
    setError("");
    if (!dateValue || !time || !course || !section || !room) {
      setError("All Fields merked as * are required to be filled");
      return;
    }
    if (dateValue.day() === 0) {
      setError("You can't take extra class on Sunday");
      return;
    }

    const data = {
      day: dateValue.format("YYYY-MM-DD"),
      start_time: START_TIMES[time[0] / 10],
      end_time: END_TIMES[time[1] / 10 - 1],
      subject: course,
      section: section,
      room: room,
      description: description || ".",
      teacher: user.id,
      dayName: DAYS[dateValue.day()],
    };

    const response = await axios.post(
      "http://localhost:8000/college/extraclass/",
      data
    );
    console.log(response);
    if (response.status === 201) {
      setError("Extra class added successfully");
      router.refresh();
    } else if (response.status === 204) {
      setError(
        "An entry already exists for the given room, start time, and day"
      );
    } else {
      setError("An error occured while adding extra class");
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
              height: { xs: "auto", md: "100vh" },
            }}
          />
        </Grid>
        <Grid item md={6} xs={12} sx={{ mt: { xs: 5, md: 0 } }}>
          <Typography variant="h4">Take an Extra Class</Typography>
          <Typography variant="body1">
            Fill up all the feilds to check if you can take an extra class.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                orientation="landscape"
                sx={{ mb: 5 }}
                disablePast
                maxDate={dayjs().add(1, "week")}
                shouldDisableDate={shouldDisableDate}
                onChange={(newValue) => setDateValue(newValue || dayjs())}
              />
            </LocalizationProvider>
            <Slider
              value={time}
              onChange={handleChange}
              step={10}
              marks={MARKS}
              sx={{ mb: 2 }}
            />
            <Typography
              variant="body2"
              textAlign={"center"}
              sx={{ mt: 1, mb: 2 }}
            >
              {`From ${START_TIMES[time[0] / 10]} to ${
                END_TIMES[time[1] / 10 - 1]
              }`}
            </Typography>
            <TextField
              select
              label="Select Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              sx={{ mb: 2 }}
              required
            >
              {(
                courses as {
                  course_id: number;
                  course_name: string;
                  course_semester: string;
                }[]
              ).map((course) => (
                <MenuItem key={course.course_id} value={course.course_id}>
                  {course.course_name} | {course.course_semester} sem
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              sx={{ mb: 2 }}
              required
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

            <TextField
              label="Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
              multiline
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
    </Box>
  );
}
