import {
  AppBar,
  Badge,
  CircularProgress,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import Link from "next/link";

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@material-ui/icons";
import { Fragment, useState } from "react";

import { useAuthState } from "../../context/auth";
import Sidebar from "./Sidebar";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { isAuthenticated, isLoading } = useAuthState();
  const classes = useStyles();
  return (
    <Fragment>
      <AppBar color="inherit" position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>

          <Link href="/" passHref>
            <Typography
              style={{ cursor: "pointer" }}
              variant="h6"
              className={classes.title}
            >
              TrustServiceU
            </Typography>
          </Link>

          {isLoading ? (
            <CircularProgress />
          ) : (
            isAuthenticated && (
              <Fragment>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <ProfileMenu />
              </Fragment>
            )
          )}
        </Toolbar>
      </AppBar>

      <Sidebar open={openDrawer} setOpen={setOpenDrawer} />
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
