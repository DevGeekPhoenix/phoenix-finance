import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestTransactions } from "../components/dashboard/LatestTransactions";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { CardDetails } from "../components/dashboard/CardDetails";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { Gradient } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state.data.userData);

  console.log(userData);

  return (
    <>
      <Head>
        <title>Phoenix Finance | Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container display={"flex"} flexDirection={"column"} rowSpacing={3}>
            <Grid alignSelf={"center"}>
              <CardDetails
                userData={userData}
                sx={{
                  height: "220px",
                  width: "380px",
                  borderRadius: "20px",
                  backgroundImage: "linear-gradient(45deg,#4199a5 ,#4199a5, #5090e5 ,#453fc3)",
                }}
              />
            </Grid>
            <Grid item lg={12} md={12} xl={9} xs={12}>
              <LatestTransactions />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
