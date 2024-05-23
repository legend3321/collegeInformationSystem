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
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleClick = async () => {
    setError("");
    if (!email || !password || !username || !first_name || !last_name) {
      setError("All fields are required");
      return;
    }
    if (email.split("@")[1] !== "geu.ac.in") {
      setError("Please use your GEU email");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/user/",
        {
          username,
          email,
          password,
          first_name,
          last_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        router.push("/login");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later." + error);
    }
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
                setUsername(e.target.value);
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
                value={first_name}
                onChange={(e) => {
                  setfirst_name(e.target.value);
                }}
                sx={{ mb: 2, flexGrow: 1 }}
              />
              <TextField
                label="Last Name"
                required
                variant="outlined"
                value={last_name}
                onChange={(e) => {
                  setlast_name(e.target.value);
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
              onFocus={(e) => {
                setEmail(first_name + last_name + username + "@geu.ac.in");
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
            <Typography variant="subtitle2" textAlign={"center"} sx={{ mb: 2 }}>
              By signing up, you agree to our Terms, Data Policy and Cookies
              Policy
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ mb: 2 }}
              color={"error"}
            >
              {error}
            </Typography>
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
