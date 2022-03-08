import { RefreshIcon } from "@heroicons/react/outline";
import { useWorkspace } from "@hooks/useWorkspace";
import { Tweet } from "@models/Tweet";
import { useEffect, useState } from "react";
import { TweetCard } from "./TweetCard";

export const TweetList = () => {
  const { program } = useWorkspace();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const getTweets = async () => {
    try {
      const newTweets = await program.account.tweet?.all();
      setTweets(
        newTweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account))
      );
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  return (
    <div className="relative">
      <div className="flex justify-center absolute w-full">
        <button
          onClick={getTweets}
          className="p-2 rounded-full text-white bg-indigo-500 shadow-lg opacity-0 hover:opacity-100 transition-all"
        >
          <RefreshIcon className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col divide-y-2">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.key} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};
