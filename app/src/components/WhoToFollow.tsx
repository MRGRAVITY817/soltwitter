import Image from "next/image";

interface FollowItemParams {
  author: string;
  id: string;
  img: string;
}
export const WhoToFollow = () => {
  const recommendations: FollowItemParams[] = [
    {
      author: "Apollo",
      id: "apollographql",
      img: "/logo.png",
    },
    {
      author: "Dan",
      id: "dan_abramov",
      img: "/logo.png",
    },
  ];
  return (
    <section id="who-to-follow" className="p-4 bg-gray-100 rounded-xl">
      <h2 className="mb-4">Who to follow</h2>
      <div className="grid grid-flow-row gap-3">
        {recommendations.map((item) => (
          <FollowItem key={item.id} {...item} />
        ))}
      </div>
      <div className="mt-4">
        <button className="text-indigo-600 text-base">Show more</button>
      </div>
    </section>
  );
};

const FollowItem: React.FC<FollowItemParams> = (item) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <Image
          src={item.img}
          alt={item.id}
          height={50}
          width={50}
          className="bg-indigo-700 rounded-full"
        />
        <div>
          <h3>{item.author}</h3>
          <p className="text-gray-500">@{item.id}</p>
        </div>
      </div>
      <button className="bg-indigo-500 hover:bg-indigo-600 transition-colors py-2 px-4 rounded-full text-white">
        Follow
      </button>
    </div>
  );
};
