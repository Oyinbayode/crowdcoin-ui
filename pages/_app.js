import Head from "next/head";
import { MantineProvider, Loader, LoadingOverlay } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import AppLayout from "../src/layout/App.layout";
import OurGlobalStyles from "../src/shared/GlobalStyles";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import Router from "next/router";
import { useState, useEffect } from "react";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function App({ Component, pageProps, router }) {
  router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router, setPageLoading]);
  return (
    <>
      <NextNProgress />
      <Head>
        <title>Crowdcoin</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Web3ReactProvider getLibrary={getLibrary}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
            fontFamily: "'Archivo', sans-serif",
            loader: "bars",
          }}
        >
          <NotificationsProvider
            sx={{
              top: "130px",
              right: "16px",
              width: "541px",
            }}
            position="top-right"
            zIndex={2077}
          >
            <OurGlobalStyles />

            <LoadingOverlay visible={pageLoading} overlayBlur={2} />

            <AppLayout
              Component={Component}
              router={router}
              pageProps={pageProps}
            />
          </NotificationsProvider>
        </MantineProvider>
      </Web3ReactProvider>
    </>
  );
}
