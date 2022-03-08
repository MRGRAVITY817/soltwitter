import { Idl, Program, Provider, Wallet } from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { ConfirmOptions, Connection, PublicKey } from "@solana/web3.js";
import { ENDPOINT } from "@utils/constants";
import { useMemo } from "react";
import idl from "../../soltwitter.json";

export const IDL = idl as Idl;

export const opts: ConfirmOptions = {
  preflightCommitment: "processed",
  commitment: "processed",
};

export const programID = new PublicKey(idl.metadata.address);

export const useWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = useMemo(
    () => new Connection(ENDPOINT, opts.preflightCommitment),
    []
  );
  const provider = useMemo(
    () => new Provider(connection, wallet as Wallet, opts),
    [wallet, connection]
  );
  const program = useMemo(
    () => new Program(IDL, programID, provider),
    [provider]
  );
  return { wallet, connection, provider, program };
};
