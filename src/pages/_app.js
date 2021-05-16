import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import "../styles/global.css";

import Axios from "axios";

import { SWRConfig } from "swr";

import { AuthProvider } from "../context/auth";
import { UIProvider } from "../context/ui";
import SnackbarAlert from "../components/SnackbarAlert";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
Axios.defaults.withCredentials = true;

const fetcher = async (url) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export default function App(props) {
  const { Component, pageProps } = props;

  const classes = useStyle();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <SWRConfig
        value={{
          fetcher,
          dedupingInterval: 10000,
        }}
      >
        <AuthProvider>
          <UIProvider>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "100vh",
                }}
              >
                <nav>
                  <Navbar />
                </nav>

                <main
                  style={{
                    flex: 1,
                  }}
                  className={classes.main}
                >
                  <Component {...pageProps} />
                </main>

                <footer>
                  <Footer />
                </footer>

                <SnackbarAlert />
              </div>
            </ThemeProvider>
          </UIProvider>
        </AuthProvider>
      </SWRConfig>
    </React.Fragment>
  );
}

const useStyle = makeStyles((theme) => ({
  main: {
    padding: "16px 8px",
    [theme.breakpoints.up("md")]: {
      padding: "24px",
    },
  },
}));
