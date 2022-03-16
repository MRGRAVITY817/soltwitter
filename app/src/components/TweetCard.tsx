import { Tweet } from "@models/Tweet";
import { HashtagIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useMe } from "@hooks/useMe";
import { useState } from "react";
import { MAX_TWEET_LENGTH } from "@utils/constants";
import { classNames } from "@utils/functions";
import { RoundedButton } from "./RoundedButton";
import { useTweet } from "@hooks/useTweet";

export const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const { isMyTweet } = useMe();
  const { updateTweet } = useTweet();
  const [topic, setTopic] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const isMine = isMyTweet(tweet);

  const initForm = () => {
    setTopic("");
    setContent("");
    setEditMode(false);
  };

  const updateTweetAndSet = async (
    tweet: Tweet,
    topic: string,
    content: string
  ) => {
    const updatedTweet = await updateTweet(tweet, topic, content);
    if (updatedTweet) {
      initForm();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  return (
    <div className="py-6 px-8">
      <div className="flex items-center justify-start gap-2 mb-1">
        <h3>{tweet.author_display}</h3>
        <p className="text-gray-500">•</p>
        <p className="text-gray-500">{tweet.created_ago}</p>
        {isMine && !editMode && (
          <div
            id="modify tweet"
            className="flex items-center justify-start gap-4 ml-4"
          >
            <PencilIcon
              onClick={() => {
                setEditMode(true);
                setContent(tweet.content);
                setTopic(tweet.topic);
              }}
              className="w-5 h-5 text-gray-500 cursor-pointer"
            />
            <TrashIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        )}
      </div>
      {editMode ? (
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
            className="resize-none outline-none w-full text-md p-4 bg-gray-100 rounded-xl my-4"
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
              <div className="flex items-center justify-start gap-2">
                <RoundedButton
                  type="button"
                  mode="default"
                  onClick={() => initForm()}
                >
                  Cancel
                </RoundedButton>
                <RoundedButton
                  type="button"
                  disabled={content === tweet.content}
                  onClick={() => updateTweetAndSet(tweet, topic, content)}
                >
                  Edit Tweet
                </RoundedButton>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-1">
            <p>{tweet.content}</p>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2">
            <p className="text-indigo-500">#{tweet.topic}</p>
          </div>
        </>
      )}
    </div>
  );
};
