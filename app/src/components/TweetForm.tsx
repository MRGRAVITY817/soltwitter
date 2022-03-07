import { MAX_TWEET_LENGTH } from "@utils/constants";
import { useState } from "react";
import { HashtagIcon } from "@heroicons/react/solid";
import { classNames } from "@utils/functions";
import { useWallet } from "@solana/wallet-adapter-react";

export const TweetForm = () => {
  const [input, setInput] = useState<string>("");
  const { connected } = useWallet();
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
            onChange={(e) => setInput(e.currentTarget.value)}
            className="resize-none outline-none w-full text-lg p-2"
          />
          <div className="flex justify-between items-center">
            <div className="bg-gray-100 rounded-full py-2 px-4 gap-4 flex items-center justify-start">
              <HashtagIcon className="w-6 h-6 text-gray-500" />
              <input
                type="text"
                placeholder="topic"
                className="bg-transparent"
              />
            </div>
            <div className="flex items-center justify-end gap-6">
              <p
                className={classNames(
                  "text-lg",
                  input.length / MAX_TWEET_LENGTH <= 0.6
                    ? "text-gray-500"
                    : input.length / MAX_TWEET_LENGTH > 0.6 &&
                      input.length / MAX_TWEET_LENGTH < 0.8
                    ? "text-yellow-500"
                    : input.length / MAX_TWEET_LENGTH >= 0.8
                    ? "text-red-600"
                    : ""
                )}
              >
                {MAX_TWEET_LENGTH - input.length} left
              </p>
              <button className="py-2 px-4 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-medium">
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
