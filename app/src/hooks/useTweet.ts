import { useWorkspace } from "./useWorkspace";

export const useTweet = () => {
  const { program } = useWorkspace();
  const fetchTweets = async () => {
    const tweets = await program.account.tweets?.all();
    return tweets;
  };
  return { fetchTweets };
};
