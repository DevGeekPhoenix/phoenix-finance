import { Box, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";

export const AnalyticsLayout = (props) => {
  const DataVisualiztionMap = dynamic(() => import("../DataVisualiztionMap"), {
    loading: () => <p>Map is loading...</p>,
    ssr: false,
  });
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Analytics
        </Typography>
      </Box>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item height="450px" sx={{ mt: 2 }} md={12} xs={12}>
          <DataVisualiztionMap />
        </Grid>
      </Grid>
    </Box>
  );
};
