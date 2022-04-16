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
import { useSelector } from "react-redux";

export const AccountProfile = ({ preview }) => {
  const userData = useSelector((state) => state.data.userData);
  console.log(preview);
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={preview}
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
