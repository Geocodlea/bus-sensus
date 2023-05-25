import { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  Button,
  TextField,
  Paper,
  Select,
  FormControl,
  MenuItem,
  LinearProgress,
  Typography,
  FormHelperText,
} from "@mui/material";

export default function Form() {
  const [busNumber, setBusNumber] = useState("");
  const [route, setRoute] = useState("");
  const [station, setStation] = useState("");
  const [busName, setBusName] = useState("");
  const [routeName, setRouteName] = useState("");
  const [stationName, setStationName] = useState("");
  const [people, setPeople] = useState("");
  const [isErrorPeople, setIsErrorPeople] = useState(false);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch("/api/buses");
        if (!response.ok) {
          throw new Error("Error fetching buses");
        }
        const buses = await response.json();
        setBuses(buses);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchBuses();
  }, []);

  if (error) {
    return (
      <Typography variant="h5" color="#d32f2f" align="center" m={[3, 5]}>
        {error}
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box sx={{ width: 1 }}>
        <LinearProgress color="inherit" />
      </Box>
    );
  }

  const handleChangeBusNumber = async (event) => {
    setBusNumber(event.target.value);
    setBusName(buses.find((bus) => bus.busId === event.target.value).name);

    setRoute("");
    setStation("");

    setIsSubmitted(false);

    try {
      const fetchRoutes = await fetch(`/api/buses/${event.target.value}`);
      if (!fetchRoutes.ok) {
        throw new Error("Error fetching routes");
      }
      const routes = await fetchRoutes.json();
      setRoutes(routes);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeRoute = async (event) => {
    setRoute(event.target.value);
    setRouteName(
      routes.find((route) => route.route_id === event.target.value).name
    );

    setStation("");

    try {
      const fetchStations = await fetch(`/api/routes/${event.target.value}`);
      if (!fetchStations.ok) {
        throw new Error("Error fetching stations");
      }
      const stations = await fetchStations.json();
      setStations(stations);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeStation = (event) => {
    setStation(event.target.value);
    setStationName(
      stations.find((station) => station.stationId === event.target.value).name
    );
  };

  const handleChangePeople = (event) => {
    const inputValue = event.target.value;
    const numberValue = parseInt(inputValue);

    setIsErrorPeople(
      !inputValue ||
        numberValue < 0 ||
        numberValue > 130 ||
        !Number.isInteger(Number(inputValue))
    );

    setPeople(inputValue);
  };

  const handleSubmit = async (event) => {
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        body: JSON.stringify({
          busId: busNumber,
          busName: busName,
          routeId: route,
          routeName: routeName,
          stationId: station,
          stationName: stationName,
          noOfPassengers: people,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsSubmitted(true);
      setBusNumber("");
      setRoute("");

      setStation("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Typography variant="body1" align="justify" m={[2, 4]}>
        Choose the bus number, bus route and station and enter an aproximation
        of the no. of passengers in the bus, then hit submit.
      </Typography>
      <Box
        m={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <Paper elevation={8}>
          <FormControl fullWidth>
            <InputLabel id="bus-number-label">Bus number</InputLabel>
            <Select
              labelId="bus-number-label"
              value={busNumber}
              label="Bus number"
              onChange={handleChangeBusNumber}
            >
              {buses.map((item) => (
                <MenuItem key={item.busId} value={item.busId}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper elevation={8}>
          <FormControl fullWidth>
            <InputLabel id="bus-route-label">Bus route</InputLabel>
            <Select
              disabled={!busNumber}
              labelId="bus-route-label"
              value={route}
              label="Bus route"
              onChange={handleChangeRoute}
            >
              {routes &&
                routes.map((item) => (
                  <MenuItem key={item.route_id} value={item.route_id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper elevation={8}>
          <FormControl fullWidth>
            <InputLabel id="station-label">Station</InputLabel>
            <Select
              disabled={!busNumber || !route}
              labelId="station-label"
              value={station}
              label="Station"
              onChange={handleChangeStation}
            >
              {stations &&
                stations.map((item) => (
                  <MenuItem key={item.stationId} value={item.stationId}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper elevation={8}>
          <TextField
            error={isErrorPeople}
            required
            label="No. of passengers in the bus"
            type="number"
            value={people}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangePeople}
            fullWidth
            inputProps={{
              min: 0,
              max: 100,
              step: "1",
            }}
          />
        </Paper>
        {isErrorPeople && (
          <FormHelperText error>
            Please enter a number between 0 and 100.
          </FormHelperText>
        )}
        <Box align="right">
          <Paper
            elevation={8}
            sx={{ width: "fit-content", marginBottom: "20px" }}
          >
            <Button
              disabled={!station || !people || isErrorPeople}
              onClick={handleSubmit}
              variant="outlined"
              size="large"
              color="inherit"
            >
              Submit
            </Button>
          </Paper>
          {isSubmitted && (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#2e7d32" }}
            >
              Form sent successfully
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
