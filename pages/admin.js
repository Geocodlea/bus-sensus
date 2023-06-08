import { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  Paper,
  Select,
  FormControl,
  MenuItem,
  LinearProgress,
  Typography,
} from "@mui/material";
import Chart from "../components/Chart";

export default function Admin() {
  const [reports, setReports] = useState([]);
  const [busName, setBusName] = useState("");
  const [routeName, setRouteName] = useState("");
  const [stationName, setStationName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const reports = await response.json();
        setReports(reports);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchReports();
  }, []);

  if (error) {
    return (
      <Typography variant="h5" color="#d32f2f" align="center" m={[3, 5]}>
        Error: {error}
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
  };

  const handleChangeRoute = async (event) => {
    setRouteName(event.target.value);
    setStationName("");
  };

  const handleChangeStation = (event) => {
    setStationName(event.target.value);
  };

  return (
    <>
      <Typography variant="body1" align="justify" m={[2, 4]}>
        Choose the bus number, bus route and station to get an average of the
        no. of passengers in that bus on that station by hours.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: 400,
          margin: "0 auto 30px auto",
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
              {Object.values(
                reports.reduce((acc, report) => {
                  if (!acc[report.busName]) {
                    acc[report.busName] = report;
                  }
                  return acc;
                }, {})
              ).map((item) => (
                <MenuItem key={item.reportId} value={item.busName}>
                  {item.busName}
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
              {Object.values(
                reports
                  .filter((item) => item.busName === busName)
                  .reduce((acc, report) => {
                    if (!acc[report.routeName]) {
                      acc[report.routeName] = report;
                    }
                    return acc;
                  }, {})
              ).map((item) => (
                <MenuItem key={item.reportId} value={item.routeName}>
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
              {Object.values(
                reports
                  .filter((item) => item.routeName === routeName)
                  .reduce((acc, report) => {
                    if (!acc[report.stationName]) {
                      acc[report.stationName] = report;
                    }
                    return acc;
                  }, {})
              )
                .sort((a, b) => a.stationName.localeCompare(b.stationName))
                .map((item) => (
                  <MenuItem key={item.reportId} value={item.stationName}>
                    {item.stationName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Paper>
      </Box>
      {busName && routeName && stationName && (
        <Chart
          reports={reports}
          busName={busName}
          routeName={routeName}
          stationName={stationName}
        />
      )}
    </>
  );
}
