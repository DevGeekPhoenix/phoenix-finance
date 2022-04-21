import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { AnalyticsLayout } from "../components/Analytics/analyticslayout";
import { DashboardLayout } from "../components/dashboard-layout";

const Analytics = () => (
  <>
    <Head>
      <title>Analytics | Phoenix Finance</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <AnalyticsLayout />
        <Box sx={{ pt: 3 }}></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        ></Box>
      </Container>
    </Box>
  </>
);

Analytics.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Analytics;
