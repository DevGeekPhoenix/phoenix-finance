import {
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import dynamic from "next/dynamic";

export const ProductListToolbar = (props) => {
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
        {/* <iframe
          src="https://www.google.com/maps/d/embed?mid=1-6HQGXmwwew02zeDR5KpY1OA1mc&hl=en_US&ehbc=2E312F"
          width="640"
          height="480"
        ></iframe> */}
      </Grid>
    </Box>
  );
};
