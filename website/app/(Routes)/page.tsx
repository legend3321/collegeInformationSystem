import { Box, Container, Divider, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Home() {
  return (
    <Container sx={{ pt: 0 }}>
      <Marquee gradient>
        <Typography variant="body1" sx={{ bgcolor: "#fff", py: 1 }}>
          The Department of Computer Science and Information Technology |
          Graphic Era (Deemed to be University)
        </Typography>
      </Marquee>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h4" textAlign={"center"}>
        Notices This Month
      </Typography>
      <Typography variant="h6" textAlign={"center"}>
        ({month[new Date().getMonth()]})
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 2,
        }}
      >
        <Typography variant="body1">
          End Term Practical Examination Schedule-B. Tech. 4th and 6th May 20,
          2024
        </Typography>
        <Typography variant="body1">
          A warm invitation for the Convocation Ceremony 2024 for CSE !
        </Typography>
        <Typography variant="subtitle1">
          It is with immense pleasure and pride that we extend this invitation
          to you for our upcoming Convocation Ceremony. This momentous occasion
          marks the culmination of your academic journey and the beginning of a
          new chapter in your lives!
        </Typography>
        <Typography variant="body1">
          End Term Practical Examination Schedule-B. Tech. 4th and 6th May 20,
          2024
        </Typography>
      </Box>
    </Container>
  );
}
