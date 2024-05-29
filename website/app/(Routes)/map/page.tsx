"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TextField,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
import { use, useState, useEffect } from "react";
// import mapboxgl from "mapbox-gl"; // Import the 'mapbox-gl' library

export default function Page() {
  const [mapDisplay, setMapDisplay] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [locations, setLocations] = useState([]);
  const [walkingDistance, setWalkingDistance] = useState(0);
  const [walkingTime, setWalkingTime] = useState(0);

  async function loadMap() {
    const response = await axios.get("http://localhost:8000/map/");
    if (response.status === 200) {
      console.log(response.data);
      setMapDisplay(response.data.map);
    }
  }

  async function getLocations() {
    const response = await axios.get("http://localhost:8000/map/locations/");
    if (response.status === 200) {
      console.log(response.data);
      setLocations(response.data.locations);
    }
  }

  async function getRoute() {
    const response = await axios.post("http://localhost:8000/map/directions/", {
      source: source,
      destination: destination,
    });
    if (response.status === 200) {
      console.log(response.data);
      setMapDisplay(response.data.map);
      setWalkingDistance(response.data.walking_distance);
      setWalkingTime(response.data.walking_duration);
    }
  }

  useEffect(() => {
    loadMap();
    getLocations();
  }, []);

  return (
    <Container sx={{ py: 3 }}>
      <Box dangerouslySetInnerHTML={{ __html: mapDisplay }} />

      {walkingDistance > 0 && walkingTime > 0 ? (
        <Table sx={{ mt: 2 }}>
          <TableBody>
            <TableRow>
              <TableCell align="right">Walking Distance</TableCell>
              <TableCell align="left">{walkingDistance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Walking Time</TableCell>
              <TableCell align="left">{walkingTime}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}

      <Box sx={{ mt: 5, w: { xs: "100%", md: "50%" }, mx: "auto" }}>
        <FormControl fullWidth>
          <TextField
            select
            label="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {(locations as { id: number; name: string }[]).map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            sx={{ mt: 2 }}
          >
            {(locations as { id: number; name: string }[]).map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={getRoute}
            sx={{ mt: 2 }}
          >
            Get Route
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}
