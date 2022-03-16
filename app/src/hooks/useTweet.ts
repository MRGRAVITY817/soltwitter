import { Tweet } from "@models/Tweet";
import { web3 } from "@project-serum/anchor";
import { useWorkspace } from "./useWorkspace";

export const useTweet = () => {
  const { program, wallet } = useWorkspace();

  const getTweets = async () => {
    try {
      const newTweets = await program.account.tweet?.all();
      return newTweets.map(
        (tweet) => new Tweet(tweet.publicKey, tweet.account)
      );
    } catch (error) {
      console.log(`GetTweets Error: ${error}`);
      return null;
    }
  };

  const sendTweet = async (topic: string, content: string) => {
    // new keypair for tweet account
    const tweet = web3.Keypair.generate();
    try {
      // @ts-expect-error
      await program.rpc.sendTweet(topic, content, {
        accounts: {
          author: wallet?.publicKey,
          tweet: tweet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [tweet],
      });
      const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
      return new Tweet(tweet.publicKey, tweetAccount);
    } catch (error) {
      console.log(`Send Tweet Error: ${error}`);
      return null;
    }
  };

  const updateTweet = async (tweet: Tweet, topic: string, content: string) => {
    try {
      // @ts-expect-error
      await program.rpc.updateTweet(topic, content, {
        accounts: {
          author: wallet?.publicKey,
          tweet: tweet.publicKey,
        },
      });
      tweet.topic = topic;
      tweet.content = content;
      return tweet;
    } catch (error) {
      console.log(`Update Tweet Error: ${error}`);
      return null;
    }
  };
  return { getTweets, sendTweet, updateTweet };
};
