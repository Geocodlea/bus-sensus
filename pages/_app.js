import { Box, Typography } from "@mui/material";

export default function App({ Component, pageProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 700, width: 1 }}>
        <Typography variant="h3" gutterBottom align="center" m={[3, 5]}>
          Bus Sensus Brasov
        </Typography>
        <Component {...pageProps} />
      </Box>
    </Box>
  );
}
