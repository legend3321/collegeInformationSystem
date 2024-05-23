"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Image from "next/image";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

export default function Navbar(props: Props) {
  const user = null;

  const { window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return (
    <AppBar
      sx={{
        mb: 0,
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,.8)",
        backdropFilter: "blur(30px)",
        color: "black",
        py: 1,
        borderBottom: "1px solid rgba(0,0,0,.1)",
      }}
      elevation={trigger ? 4 : 0}
    >
      <Container sx={{}}>
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" sx={{ textDecoration: "none", color: "#333" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Image src={"/logo.png"} width={64} height={64} alt={"logo"} />
              </Box>
              <Divider
                orientation="vertical"
                sx={{ mx: 2, display: { xs: "none", md: "block" } }}
                flexItem
              />
              <Typography variant="h6">
                CSIT
                <Box sx={{ color: red[800], display: "inline" }}>GEU</Box>
              </Typography>
            </Box>
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              href="/map"
              sx={{
                textDecoration: "none",
                color: "#333",
                mx: { xs: 1 },
              }}
            >
              <Typography variant="button">Map</Typography>
            </Link>
            <Link
              href="/timetable"
              sx={{
                textDecoration: "none",
                color: "#333",
                mx: { xs: 0, md: 1 },
              }}
            >
              <Typography variant="button">TimeTable</Typography>
            </Link>
            <Divider orientation="vertical" sx={{ mx: 1 }} flexItem />
            {user ? (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  <Button>Hi, user</Button>
                </Typography>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  sx={{ mr: 1, textDecoration: "none", color: "#333" }}
                >
                  <Typography variant="button">Login</Typography>
                </Link>
                <Link
                  href="/signup"
                  sx={{
                    textDecoration: "none",
                    color: "#333",
                    mx: { xs: 0, md: 1 },
                  }}
                >
                  <Typography variant="button">Signup</Typography>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}