import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import apolloClient from "../components/apollo-client";
// import { ApolloProvider } from "@apollo/react-hooks";
import CustomApolloProvider from "../components/apollo-client";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";
import SetDataToRedex from "src/components/SetDataToRedex";
import "../map.css";

const cookies = new Cookies();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const router = useRouter();
  const token = cookies.get("ut");

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token]);
  console.log(router.pathname);
  useEffect(() => {
    if (router.pathname === "/login") {
      cookies.remove("ut");
    }
  }, [router.pathname]);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <CustomApolloProvider>
        <SetDataToRedex />
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
      </CustomApolloProvider>
    </Provider>
  );
};

export default App;
