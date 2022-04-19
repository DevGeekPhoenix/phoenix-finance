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

      <Grid item height="450px" sx={{ mt: 2 }} md={12} xs={12}>
        <DataVisualiztionMap />
      </Grid>
    </Box>
  );
};
