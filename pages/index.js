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

  const handleChangeBus = async (event) => {
    setBusName(event.target.value);

    setRouteName("");
    setStationName("");
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
    setRouteName(event.target.value);

    setStationName("");

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
    setStationName(event.target.value);
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
          busName: busName,
          routeName: routeName,
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
      setBusName("");
      setRouteName("");
      setStationName("");
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
              value={busName}
              label="Bus number"
              onChange={handleChangeBus}
            >
              {buses.map((item) => (
                <MenuItem key={item.busId} value={item.name}>
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
              disabled={!busName}
              labelId="bus-route-label"
              value={routeName}
              label="Bus route"
              onChange={handleChangeRoute}
            >
              {routes &&
                routes.map((item) => (
                  <MenuItem key={item.routeId} value={item.routeName}>
                    {item.routeName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
        <Paper elevation={8}>
          <FormControl fullWidth>
            <InputLabel id="station-label">Station</InputLabel>
            <Select
              disabled={!busName || !routeName}
              labelId="station-label"
              value={stationName}
              label="Station"
              onChange={handleChangeStation}
            >
              {stations &&
                stations.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
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
              max: 130,
              step: "1",
            }}
          />
        </Paper>
        {isErrorPeople && (
          <FormHelperText error>
            Please enter a number between 0 and 130.
          </FormHelperText>
        )}
        <Box align="right">
          <Paper
            elevation={8}
            sx={{ width: "fit-content", marginBottom: "20px" }}
          >
            <Button
              disabled={!stationName || !people || isErrorPeople}
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
