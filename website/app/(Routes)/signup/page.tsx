"use client";

import { Label } from "@mui/icons-material";
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  TextField,
  Button,
  Link,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [classRollNo, setClassRollNo] = useState<number>();
  const [password, setPassword] = useState("");
  const [collegeId, setCollegeId] = useState<number>();
  const [year, setYear] = useState<number>();
  const [semester, setSemester] = useState<number>();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState<number>();
  const [section, setSection] = useState("");

  const handleClick = () => {
    console.log({
      email,
      classRollNo,
      password,
      collegeId,
      year,
      semester,
      firstName,
      middleName,
      lastName,
      phone,
      section,
    });
  };

  return (
    <Container>
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
        <Grid item md={6} sm={12} xs={12} sx={{ mt: { xs: 5, md: 0 } }}>
          <Typography variant="h3">Sign Up</Typography>
          <Typography variant="h6">
            Welcome to GEU Student Management!
          </Typography>
          <Typography variant="body1">
            Add yourself to experience full potential of this platform{" "}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="section">Section</InputLabel>
            <Select
              labelId="section"
              label="Section"
              variant="outlined"
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
              }}
              fullWidth
              sx={{ mb: 2 }}
              required
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="F">F</MenuItem>
              <MenuItem value="G">G</MenuItem>
              <MenuItem value="H">H</MenuItem>
              <MenuItem value="I">I</MenuItem>
              <MenuItem value="cst/spl1">CST/SPL 1</MenuItem>
              <MenuItem value="cst/spl2">CST/SPL 2</MenuItem>
              <MenuItem value="cc">CC</MenuItem>
            </Select>
            <TextField
              label="Class Roll Number"
              variant="outlined"
              type="number"
              value={classRollNo}
              onChange={(e) => {
                setClassRollNo(parseInt(e.target.value));
              }}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <Box sx={{ display: "flex", width: "100%" }}>
              <TextField
                label="First Name"
                required
                variant="outlined"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                sx={{ mb: 2, flexGrow: 1 }}
              />
              <TextField
                label="Middle Name"
                variant="outlined"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
                sx={{ mb: 2, flexGrow: 1 }}
              />
              <TextField
                label="Last Name"
                required
                variant="outlined"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                sx={{ mb: 2, flexGrow: 1 }}
              />
            </Box>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              placeholder="example@geu.ac.in"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Phone Number"
              type="number"
              variant="outlined"
              placeholder="10 digit number"
              fullWidth
              value={phone}
              onChange={(e) => {
                setPhone(parseInt(e.target.value));
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Year"
              variant="outlined"
              type="number"
              max={2025}
              min={2015}
              fullWidth
              placeholder="Y Y Y Y"
              value={year}
              onChange={(e) => {
                setYear(parseInt(e.target.value));
                setCollegeId(parseInt(e.target.value.slice(2, 4)));
              }}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="College ID"
              variant="outlined"
              fullWidth
              value={collegeId}
              onChange={(e) => {
                setCollegeId(parseInt(e.target.value));
              }}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              label="Current Semester"
              variant="outlined"
              type="number"
              placeholder="1-8"
              min={1}
              max={8}
              fullWidth
              value={semester}
              onChange={(e) => {
                setSemester(parseInt(e.target.value));
              }}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 2, mb: 4 }}
              onClick={handleClick}
            >
              <Typography variant="h6" sx={{ letterSpacing: 3 }}>
                Signup
              </Typography>
            </Button>
            <Typography variant="body1" textAlign={"center"}>
              Already have an account?{" "}
              <Link href="/login" sx={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
}
