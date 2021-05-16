import React from "react";
import { useAuthDispatch, useAuthState } from "../../context/auth";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import axios from "axios";

import { useRouter } from "next/router";
function profile(props) {
  const { isAuthenticated, user, isLoading } = useAuthState();
  const authDispatch = useAuthDispatch();

  const router = useRouter();
  const classes = useStyle();

  async function logoutUser() {
    try {
      const res = await axios.get("/auth/logout");

      if (res.data.type === "success") {
        authDispatch("LOGOUT");
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Grid container justify="center">
      <Grid item xs={12} md={6}>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : isAuthenticated ? (
          <Paper className={classes.paper}>
            <Avatar src={user.profilePic} className={classes.profilePic} />
            <div className={classes.detail}>
              <Typography variant="h4">{user.name}</Typography>

              <Typography>{user.email}</Typography>
              <Button
                size="large"
                style={{ marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={logoutUser}
              >
                Logout
              </Button>
            </div>
          </Paper>
        ) : (
          <h2>Login to proceed</h2>
        )}
      </Grid>
    </Grid>
  );
}

const useStyle = makeStyles((t) => ({
  paper: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  profilePic: {
    width: "130px",
    height: "130px",
    border: "2px solid white",
    transition: "0.8s all",
    "&:hover": {
      transform: "translateY(10) scale(1.2)",
    },
  },

  detail: {
    margin: "20px 0px",
  },
}));

export default profile;
