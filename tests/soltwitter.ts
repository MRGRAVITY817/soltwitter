import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soltwitter } from "../target/types/soltwitter";

describe("soltwitter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Soltwitter as Program<Soltwitter>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
