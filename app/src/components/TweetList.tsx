import { RefreshIcon } from "@heroicons/react/outline";
import { useWorkspace } from "@hooks/useWorkspace";
import { Tweet } from "@models/Tweet";
import { useEffect, useState } from "react";
import { TweetCard } from "./TweetCard";

export const TweetList: React.FC<{ isProfile?: boolean }> = ({
  isProfile = false,
}) => {
  const { program, wallet } = useWorkspace();
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

  const getMyTweets = async () => {
    const myPubKey = wallet?.publicKey;
    if (typeof myPubKey !== "undefined") {
      const myTweets = await program.account.tweet?.all([
        {
          memcmp: {
            offset: 8,
            bytes: myPubKey?.toBase58(),
          },
        },
      ]);
      setTweets(
        myTweets.map((tweet) => new Tweet(tweet.publicKey, tweet.account))
      );
    }
  };

  useEffect(() => {
    isProfile ? getMyTweets() : getTweets();
  }, []);

  return (
    <div className="flex flex-col divide-y-2">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.key} tweet={tweet} />
      ))}
    </div>
  );
};
