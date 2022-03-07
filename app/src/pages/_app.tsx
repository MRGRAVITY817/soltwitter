import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { ENDPOINT } from "@utils/constants";
import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";

const WalletProvider = dynamic(() => import("@contexts/ClientWalletProvider"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ConnectionProvider endpoint={ENDPOINT}>
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </ConnectionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
