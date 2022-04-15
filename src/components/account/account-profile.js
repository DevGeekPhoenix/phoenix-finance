import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

export const AccountProfile = (props) => {
  const userData = useSelector((state) => state.data.userData);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={userData?.img}
            sx={{
              height: 120,
              mb: 2,
              width: 120,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {userData?.name}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};
