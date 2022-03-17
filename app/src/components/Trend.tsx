export const Trend = () => {
  return (
    <section className="bg-gray-100 rounded-xl p-4">
      <h2>Trends for you</h2>
      <div className="my-4 grid grid-flow-row gap-4">
        <TrendItem
          title="Super-Biotics"
          trendingLocation="South Korea"
          tweets={11000}
        />
        <TrendItem title="Web 3" trendingLocation="Germany" tweets={23456} />
        <TrendItem
          title="Machine Learning"
          trendingLocation="United States"
          tweets={3400}
        />
        <TrendItem
          title="Kpop Trends"
          trendingLocation="South Korea"
          tweets={15400}
        />
      </div>
    </section>
  );
};

const TrendItem: React.FC<{
  title: string;
  trendingLocation: string;
  tweets: number;
}> = (props) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col items-start justify-start">
        <p className="text-gray-500 text-xs">
          Trending in {props.trendingLocation}
        </p>
        <h3 className="text-base text-gray-700">{props.title}</h3>
        <p className="text-gray-500 text-xs">
          {props.tweets.toLocaleString("number")} Tweets
        </p>
      </div>
      <p className="text-xs text-gray-500 px-2 cursor-pointer">•••</p>
    </div>
  );
};
