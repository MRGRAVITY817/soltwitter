import { MAX_TWEET_LENGTH } from "@utils/constants";
import { useState } from "react";
import { HashtagIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/functions";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTweet } from "@hooks/useTweet";
import { RoundedButton } from "./RoundedButton";

export const TweetForm = () => {
  const [content, setContent] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const { connected } = useWallet();
  const { sendTweet } = useTweet();

  const sendTweetAndInit = async (newTopic: string, newContent: string) => {
    await sendTweet(newTopic, newContent);
    setTopic("");
    setContent("");
    if (typeof window !== "undefined") {
      window.location.reload();
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
          <div className="flex lg:flex-row lg:justify-between lg:items-center lg:gap-0 flex-col items-start gap-4">
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
            <div className="flex items-center justify-end w-full gap-6">
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
              <RoundedButton
                type="button"
                onClick={() => sendTweetAndInit(topic, content)}
              >
                Tweet
              </RoundedButton>
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
