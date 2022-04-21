import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { User as UserIcon } from "../icons/user";
import { Users as UsersIcon } from "../icons/users";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const items = [
  {
    href: "/dashboard",
    icon: <UsersIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/transactions",
    icon: <SwapHorizIcon fontSize="inherit" />,
    title: "Transactions",
  },
  {
    href: "/analytics",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Analytics",
  },

  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/login",
    icon: <ExitToAppIcon fontSize="small" />,
    title: "Exit",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <Box sx={{ p: 3 }}>
            <NextLink href="/dashboard" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Typography marginTop={4} color="inherit" variant="subtitle1">
            Phoenix Finance
          </Typography>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            mb: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>

        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        ></Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
