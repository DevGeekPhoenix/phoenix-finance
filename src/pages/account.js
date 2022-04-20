import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import constants from "../config/constants";

const Account = () => {
  const userData = useSelector((state) => state.data.userData);

  useEffect(() => {
    setpreview(userData?.img ? `${constants.domain}/${userData?.img}` : "");
  }, [userData]);

  const [preview, setpreview] = useState("");
  return (
    <>
      <Head>
        <title>Account | Phoenix Finance</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile preview={preview} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails setpreview={setpreview} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
