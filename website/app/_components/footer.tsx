import { Box, Container, Divider, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        width: "100%",
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Container>
        <Typography variant="body1" textAlign={"center"}>
          © 2024 CSIT GEU. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
