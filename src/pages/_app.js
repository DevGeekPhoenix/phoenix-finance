import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import apolloClient from "../components/apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const cookies = new Cookies();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const router = useRouter();
  const token = cookies.get("ut");

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token]);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Phoenix Finance</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </ApolloProvider>
  );
};

export default App;
