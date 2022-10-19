// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import React from "react";
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { Alchemy, Network } from "alchemy-sdk";
import { AppWrapper } from "../context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(config);

const { provider } = configureChains([chain.polygonMumbai], [
  alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  provider
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <WagmiConfig client={client}>
        <QueryClientProvider client={queryClient}>
          <AppWrapper alchemySdk={alchemy}>
            <Component {...pageProps} />
          </AppWrapper>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
