import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUserData } from "../../Redux/Reducer";

export const AccountProfileDetails = (props) => {
  const userData = useSelector((state) => state.data.userData);

  const [name, setName] = useState(userData?.name);
  const [img, setimg] = useState(userData?.img);

  const dispatch = useDispatch();

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Name"
                name="Name"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Profile ImgUrl"
                name="ProfileImgUrl"
                onChange={(e) => setimg(e.target.value)}
                required
                value={img}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
