import { Tweet } from "@models/Tweet";

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <div className="py-6 px-8">
      <div className="flex items-center justify-start gap-2 mb-1">
        <h3>{tweet.author_display}</h3>
        <p className="text-gray-500">•</p>
        <p className="text-gray-500">{tweet.created_ago}</p>
      </div>
      <div className="mb-1">
        <p>{tweet.content}</p>
      </div>
      <div className="flex flex-wrap items-center justify-start gap-2">
        <p className="text-indigo-500">#{tweet.topic}</p>
      </div>
    </div>
  );
};
