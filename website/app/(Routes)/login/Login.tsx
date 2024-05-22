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
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      console.log(email, password);
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/",
        {
          email,
          password,
        },
        {
          headers: {},
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        // redirect("/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ height: { xs: "200px", md: "100%" }, overflow: "hidden" }}
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
          <Typography variant="h3">Login</Typography>
          <Typography variant="h6">
            Welcome to GEU Student Management!
          </Typography>
          <Typography variant="body1">Please login to continue.</Typography>

          <Divider sx={{ my: 2 }} />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ py: 2, mb: 4 }}
            onClick={handleLogin}
          >
            <Typography variant="h6" sx={{ letterSpacing: 3 }}>
              Login
            </Typography>
          </Button>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
          <Typography variant="body1" textAlign={"center"}>
            Not joined yet?{" "}
            <Link href="/signup" sx={{ textDecoration: "none" }}>
              Signup
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
