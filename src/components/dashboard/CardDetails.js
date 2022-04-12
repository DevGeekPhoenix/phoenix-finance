import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const CardDetails = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="#f0f0f0" fontWeight={"bold"} gutterBottom variant="overline">
            Card balance
          </Typography>
          <Typography color="#fff" variant="h4">
            $ 23k
          </Typography>
          <Typography
            sx={{ width: "380px" }}
            color="#fff"
            fontWeight={"bold"}
            gutterBottom
            variant="overline"
            fontSize={20}
            textAlign={"justify"}
          >
            6273 8111 3610 8898
          </Typography>
          <Typography color="#fff" fontWeight={"bold"} gutterBottom fontSize={20}>
            {props.userData?.name}
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </CardContent>
  </Card>
);
