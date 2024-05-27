"use client";

import { Box, Container } from "@mui/material";
import axios from "axios";
import { use, useState, useEffect } from "react";
// import mapboxgl from "mapbox-gl"; // Import the 'mapbox-gl' library

export default function Page() {
  const [mapDisplay, setMapDisplay] = useState("");

  async function loadMap() {
    const response = await axios.get("http://localhost:8000/map/");
    if (response.status === 200) {
      console.log(response.data);
      setMapDisplay(response.data.map);
    }
  }

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <Container sx={{ py: 3 }}>
      <Box dangerouslySetInnerHTML={{ __html: mapDisplay }} />
    </Container>
  );
}
