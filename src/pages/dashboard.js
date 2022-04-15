import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestTransactions } from "../components/dashboard/LatestTransactions";
import { CardDetails } from "../components/dashboard/CardDetails";
import { DashboardLayout } from "../components/dashboard-layout";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userData = useSelector((state) => state.data.userData);

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
