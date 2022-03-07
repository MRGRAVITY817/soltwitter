import {
  WalletProvider,
  WalletProviderProps,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import("@solana/wallet-adapter-react-ui/styles.css" as any);

const ClientWalletProvider: React.FC<Omit<WalletProviderProps, "wallets">> = (
  props
) => {
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletWalletAdapter(),
  ];
  return (
    <WalletProvider wallets={wallets} {...props}>
      <WalletModalProvider {...props} />
    </WalletProvider>
  );
};

export default ClientWalletProvider;
