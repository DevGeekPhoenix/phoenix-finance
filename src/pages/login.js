import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import { color } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { setUserToken } from "../Redux/Reducer";

const cookies = new Cookies();

const login = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [submit] = useMutation(login);
  const dispatch = useDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      UserName: "",
      password: "",
    },
    validationSchema: Yup.object({
      UserName: Yup.string().trim().min(3).max(15).required("UserName is Required"),
      password: Yup.string().trim().min(3).max(20).required("Password is required"),
    }),
    onSubmit: async () => {
      try {
        const {
          data: { login },
        } = await submit({
          variables: { username: formik.values.UserName, password: formik.values.password },
        });
        console.log("#######");
        if (login.token) {
          cookies.set("ut", login.token);
          dispatch(setUserToken(login.token));
          router.push("/dashboard");
        }
      } catch (error) {
        alert("UserName or Password is wrong");
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Phoenix Finance</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
          backgroundColor: "#111827",
        }}
      >
        <Container
          sx={{
            backgroundColor: "#fff",
            py: 3,
            borderRadius: "10px",
          }}
          maxWidth="sm"
        >
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 2 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.UserName && formik.errors.UserName)}
              fullWidth
              helperText={formik.touched.UserName && formik.errors.UserName}
              label="UserName"
              margin="normal"
              name="UserName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="UserName"
              value={formik.values.UserName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
