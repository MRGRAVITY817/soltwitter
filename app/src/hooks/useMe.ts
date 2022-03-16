import { Tweet } from "@models/Tweet";
import { useWorkspace } from "./useWorkspace";

export const useMe = () => {
  const { wallet } = useWorkspace();
  const isMyTweet = (tweet: Tweet) => {
    if (typeof wallet?.publicKey !== "undefined") {
      return wallet?.publicKey.toBase58() === tweet.author.toBase58();
    }
    return false;
  };
  return { isMyTweet };
};
