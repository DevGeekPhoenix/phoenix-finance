import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
import { Gradient } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUserData } from "../Redux/Reducer";
import { useQuery, gql } from "@apollo/client";

const getUser = gql`
  query Query {
    me {
      name
      img
      _id
      username
      myTags {
        _id
        name
        color
      }
      myExpenses {
        _id
        amount
        tags {
          _id
          name
          color
        }
        geo {
          lat
          lon
        }
      }
    }
  }
`;

const Dashboard = () => {
  const userData = useSelector((state) => state.data.userData);
  const dispatch = useDispatch();

  const { data } = useQuery(getUser);
  useEffect(() => {
    dispatch(setUserData(data?.me));
  }, [data]);
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
              <TotalProfit
                userData={userData}
                sx={{
                  height: "220px",
                  width: "380px",
                  borderRadius: "20px",
                  backgroundImage: "linear-gradient(45deg,#4199a5 , #5090e5 ,#453fc3)",
                }}
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
