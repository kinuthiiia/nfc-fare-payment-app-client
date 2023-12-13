import Head from "next/head";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { withUrqlClient } from "next-urql";
import { SessionProvider } from "next-auth/react";

import "tailwindcss/tailwind.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App(props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });

  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>FareTag | Fast , easy & secure fare payment</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider
          emotionCache={myCache}
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
            fontFamily: "Satoshi",
          }}
        >
          <Notifications />

          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url: process.env.NEXT_PUBLIC_SERVER_REMOTE,
  requestPolicy: "network-only",
}))(App);
