import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { setUserToken } from "../Redux/Reducer";

const cookies = new Cookies();

const signup = gql`
  mutation Mutation($name: String!, $username: String!, $img: String!, $password: String!) {
    signup(name: $name, username: $username, img: $img, password: $password) {
      token
    }
  }
`;

const Register = () => {
  const [submit] = useMutation(signup);
  const dispatch = useDispatch();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      imgUrl: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().min(3).max(50).required("Name is required"),
      userName: Yup.string().trim().min(3).max(15).required("UserName is Required"),
      imgUrl: Yup.string().trim().required("Profile ImgUrl is required"),
      password: Yup.string().trim().min(3).max(20).required("Password is required"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: async () => {
      try {
        const {
          data: { signup },
        } = await submit({
          variables: {
            name: formik.values.name,
            username: formik.values.userName,
            img: formik.values.imgUrl,
            password: formik.values.password,
          },
        });
        if (signup.token) {
          cookies.set("ut", signup.token);
          dispatch(setUserToken(signup.token));
          router.push("/dashboard");
        }
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Phoenix Finance</title>
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
            py: 1,
            borderRadius: "10px",
          }}
          maxWidth="sm"
        >
          <NextLink href="/login" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Sign in
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="UserName"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.imgUrl && formik.errors.imgUrl)}
              fullWidth
              helperText={formik.touched.imgUrl && formik.errors.imgUrl}
              label="Profile ImgUrl"
              margin="normal"
              name="imgUrl"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="imgUrl"
              value={formik.values.imgUrl}
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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
