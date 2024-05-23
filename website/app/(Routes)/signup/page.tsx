"use client";

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
} from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState<number>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClick = () => {
    console.log("clicked");
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
        <Grid item md={6} xs={12} sx={{ mt: { xs: 5, md: 0 } }}>
          <Typography variant="h3">Sign Up</Typography>
          <Typography variant="h6">
            Welcome to GEU Student Management!
          </Typography>
          <Typography variant="body1">
            Add yourself to experience full potential of this platform{" "}
          </Typography>

          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth>
            <TextField
              label="College ID"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(parseInt(e.target.value));
              }}
              sx={{ mb: 1 }}
              required
            />
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Note: Student ID will be used for login
            </Typography>
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
