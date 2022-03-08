import { MAX_TWEET_LENGTH } from "@utils/constants";
import { useState } from "react";
import { HashtagIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/functions";
import { useWallet } from "@solana/wallet-adapter-react";
import { programID, useWorkspace } from "@hooks/useWorkspace";
import { web3 } from "@project-serum/anchor";
import { Tweet } from "@models/Tweet";

export const TweetForm = () => {
  const [content, setContent] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const { connected } = useWallet();
  const { wallet, program } = useWorkspace();

  const sendTweet = async (topic: string, content: string) => {
    // new keypair for tweet account
    console.log(programID.toBase58());
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
      setContent("");
      setTopic("");
      return new Tweet(tweet.publicKey, tweetAccount);
    } catch (error) {
      console.log(`Send Tweet Error: ${error}`);
      return null;
    }
  };

  return (
    <>
      {connected ? (
        <form id="tweet-form" onSubmit={(e) => e.preventDefault()}>
          <textarea
            name="tweet"
            id="tweet"
            cols={30}
            rows={4}
            maxLength={MAX_TWEET_LENGTH}
            placeholder="What's happening?"
            onChange={(e) => setContent(e.currentTarget.value)}
            value={content}
            className="resize-none outline-none w-full text-lg p-2"
          />
          <div className="flex justify-between items-center">
            <div className="bg-gray-100 rounded-full py-2 px-4 gap-4 flex items-center justify-start">
              <HashtagIcon className="w-6 h-6 text-gray-500" />
              <input
                type="text"
                placeholder="topic"
                maxLength={50}
                onChange={(e) => setTopic(e.currentTarget.value)}
                value={topic}
                className="bg-transparent outline-none"
              />
            </div>
            <div className="flex items-center justify-end gap-6">
              <p
                className={classNames(
                  "text-lg",
                  content.length / MAX_TWEET_LENGTH <= 0.6
                    ? "text-gray-500"
                    : content.length / MAX_TWEET_LENGTH > 0.6 &&
                      content.length / MAX_TWEET_LENGTH < 0.8
                    ? "text-yellow-500"
                    : content.length / MAX_TWEET_LENGTH >= 0.8
                    ? "text-red-600"
                    : ""
                )}
              >
                {MAX_TWEET_LENGTH - content.length} left
              </p>
              <button
                type="button"
                onClick={() => sendTweet(topic, content)}
                className="py-2 px-4 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-medium"
              >
                Tweet
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-xl text-gray-500 text-center">
          Connect you wallet to start tweeting...
        </p>
      )}
    </>
  );
};
