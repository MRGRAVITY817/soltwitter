import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soltwitter } from "../target/types/soltwitter";
import * as assert from "assert";

const {
  web3: { SystemProgram, Keypair },
} = anchor;

describe("soltwitter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Soltwitter as Program<Soltwitter>;

  it("will send a new tweet", async () => {
    const newTopic = "TOPIC HERE";
    const newContent = "CONTENT HERE";
    const tweet = anchor.web3.Keypair.generate();

    await program.rpc.sendTweet(
      newTopic,
      newContent,
      // Context is the always the last argument
      {
        accounts: {
          tweet: tweet.publicKey,
          // author is the wallet user - cause every time user tweets, they will approve tx with their wallet
          author: program.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [tweet],
      }
    );

    // Fetch the account details of the created tweet
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    // Ensure it has the right data.
    assert.equal(tweetAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccount.topic, newTopic);
    assert.equal(tweetAccount.content, newContent);
    assert.ok(tweetAccount.timestamp);
  });

  it("will send a new tweet from a different author", async () => {
    const otherTopic = "microservices";
    const otherContent = "I love Kubernetes!";
    // Generate other user and airdrop them some SOL
    const otherUser = Keypair.generate();

    // Tx needs some lamports, so we should request an airdrop and confirm the tx
    const signature = await program.provider.connection.requestAirdrop(otherUser.publicKey, 1000000000);
    await program.provider.connection.confirmTransaction(signature);

    // Call the "SendTweet" instruction on behalf of this other user
    const tweet = Keypair.generate();
    await program.rpc.sendTweet(otherTopic, otherContent, {
      accounts: {
        tweet: tweet.publicKey,
        author: otherUser.publicKey, // This time we use other user's key as an author
        systemProgram: SystemProgram.programId,
      },
      signers: [otherUser, tweet], // We need not only tweet account's id, but also other user's id.
    });

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    assert.equal(tweetAccount.author.toBase58(), otherUser.publicKey.toBase58());
    assert.equal(tweetAccount.topic, otherTopic);
    assert.equal(tweetAccount.content, otherContent);
    assert.ok(tweetAccount.timestamp);
  });
});
