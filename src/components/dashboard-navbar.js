import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import constants from "../config/constants";

const { domain } = constants;

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
}));

export const DashboardNavbar = (props) => {
  const userData = useSelector((state) => state.data.userData);

  const date = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = days[date.getDay()];

  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          py: 1,
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ width: "100vw", display: "flex", justifyContent: "space-between" }}>
            <IconButton sx={{ ml: 1 }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography sx={{ ml: 1 }}>{day + " " + month + " " + year}</Typography>
            </IconButton>

            <Typography alignSelf={"center"} fontSize="large" fontWeight="bold" color="GrayText">
              Hi {userData?.name}
            </Typography>
          </Box>

          <Avatar
            sx={{
              height: 70,
              width: 70,
              ml: 1,
              boxShadow: "0px 5px 5px #888888",
            }}
            src={userData?.img ? `${domain}/${userData?.img}` : ""}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
