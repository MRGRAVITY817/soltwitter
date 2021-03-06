import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Soltwitter } from "../target/types/soltwitter";
import * as assert from "assert";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const {
  web3: { SystemProgram, Keypair },
} = anchor;

describe("soltwitter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Soltwitter as Program<Soltwitter>;

  const TOPIC_ERROR = "Topic per tweet should be less or equal than 50 chars.";
  const CONTENT_ERROR = "Content per tweet should be less or equal than 280 chars.";

  const sendTweet = async (author: anchor.Address, topic: string, content: string) => {
    const tweet = Keypair.generate();
    await program.rpc.sendTweet(topic, content, {
      accounts: { tweet: tweet.publicKey, author, systemProgram: SystemProgram.programId },
      signers: [tweet],
    });

    return tweet;
  };

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

  it("will send a new tweet without a topic", async () => {
    const tweet = Keypair.generate();
    await program.rpc.sendTweet("", "hi", {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [tweet],
    });

    const tweetAccout = await program.account.tweet.fetch(tweet.publicKey);

    assert.equal(tweetAccout.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tweetAccout.topic, "");
    assert.equal(tweetAccout.content, "hi");
    assert.ok(tweetAccout.timestamp);
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

  it("will not provide a topic with more than 50 characters", async () => {
    try {
      const newTopic = "x".repeat(51);
      const newContent = "Hmmm...right content?";
      const tweet = Keypair.generate();
      await program.rpc.sendTweet(newTopic, newContent, {
        accounts: {
          tweet: tweet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [tweet],
      });
    } catch (error) {
      // Check if the error is the same from the one we declared in lib.rs
      assert.equal(error.msg, TOPIC_ERROR);
      return;
    }
    // Finish the test with error explanation
    assert.fail("The instruction should have failed with a 51-characters topic.");
  });

  it("will not provide a content with more than 280 characters", async () => {
    try {
      const newTopic = "NEW TOPIC";
      const newContent = "x".repeat(281);
      const tweet = Keypair.generate();
      await program.rpc.sendTweet(newTopic, newContent, {
        accounts: {
          tweet: tweet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [tweet],
      });
    } catch (error) {
      // Check if the error is the same from the one we declared in lib.rs
      assert.equal(error.msg, CONTENT_ERROR);
      return;
    }
    // Finish the test with error explanation
    assert.fail("The instruction should have failed with a 281-characters topic.");
  });

  it("will fetch all tweets", async () => {
    const tweetAccount = await program.account.tweet.all(); // this will get all the tweet accounts
    assert.equal(tweetAccount.length, 3); // length should be three, since we have succeeded only 3 transactions
  });

  it("will filter tweets by author", async () => {
    const authorPublicKey = program.provider.wallet.publicKey;
    const tweetAccounts = await program.account.tweet.all([
      {
        // memory compare will do memory-level comparison between input and data on given position(offset)
        memcmp: {
          // the starting byte address
          offset: 8, // our author info starts right after discriminator, which takes 8bytes
          bytes: authorPublicKey.toBase58(),
        },
      },
    ]);
    assert.equal(tweetAccounts.length, 2); // because one of the 3 succeeded txs was from other author
    assert.ok(tweetAccounts.every((tweetAccount) => tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()));
  });

  it("will filter tweets by topic", async () => {
    const topicToBeFiltered = "microservices";
    const tweetAccounts = await program.account.tweet.all([
      {
        memcmp: {
          offset:
            8 + // discriminator
            32 + // author pub key
            8 + // Timestamp
            4, // Topic string prefix
          bytes: bs58.encode(Buffer.from(topicToBeFiltered)),
        },
      },
    ]);
    assert.equal(tweetAccounts.length, 1);
    assert.ok(tweetAccounts.every((tweetAccount) => tweetAccount.account.topic === topicToBeFiltered));
  });

  it("can update a tweet", async () => {
    // 1. Send a tweet and fetch its account
    const author = program.provider.wallet.publicKey;
    const tweet = await sendTweet(author, "web2", "Hello world!");
    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    // 2. Ensure it has the right data
    assert.equal(tweetAccount.topic, "web2");
    assert.equal(tweetAccount.content, "Hello world!");
    // 3. Update the tweet
    await program.rpc.updateTweet("solana", "Good morning Everyone!", {
      accounts: { tweet: tweet.publicKey, author },
    });
    /// 4. Ensure the updated tweet has the updated data.
    const updatedTweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    assert.equal(updatedTweetAccount.topic, "solana");
    assert.equal(updatedTweetAccount.content, "Good morning Everyone!");
  });

  it("cannot update someone else's tweet", async () => {
    // 1. Send a tweet
    const author = program.provider.wallet.publicKey;
    const tweet = await sendTweet(author, "solana", "Solana is awesome!");
    try {
      // 2. Try updating the Tweet
      await program.rpc.updateTweet("eth", "Ethereum is awesome!", {
        accounts: {
          tweet: tweet.publicKey,
          author: anchor.web3.Keypair.generate().publicKey,
        },
      });
      // 3. Ensure updating the tweet did not succeed
      assert.fail("We were able to update someone else's tweet.");
    } catch (error) {
      // 4. Ensure the tweet account kept its initial data
      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
      assert.equal(tweetAccount.topic, "solana");
      assert.equal(tweetAccount.content, "Solana is awesome!");
    }
  });

  it("can delete a tweet", async () => {
    // 1. Create a new tweet
    const author = program.provider.wallet.publicKey;
    const tweet = await sendTweet(author, "solana", "Solana is awesome!");
    // 2. Delete the tweet
    await program.rpc.deleteTweet({
      accounts: {
        tweet: tweet.publicKey,
        author,
      },
    });
    // 3. Ensure fetching the tweet account returns null.
    const tweetAccount = await program.account.tweet.fetchNullable(tweet.publicKey);
    assert.ok(tweetAccount === null);
  });

  it("can delete someone else's tweet", async () => {
    // 1. Create a new tweet
    const author = program.provider.wallet.publicKey;
    const tweet = await sendTweet(author, "solana", "Solana is awesome!");
    // 2. Try to delete the Tweet from a different author.
    try {
      await program.rpc.deleteTweet({
        accounts: {
          tweet: tweet.publicKey,
          author: Keypair.generate().publicKey,
        },
      });
      assert.fail("We were able to delete some else's tweet");
    } catch (error) {
      // 3. Ensure the tweet account still exists with the right data
      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
      assert.equal(tweetAccount.topic, "solana");
      assert.equal(tweetAccount.content, "Solana is awesome!");
    }
  });
});
