import { Search } from "./Search";
import { Trend } from "./Trend";
import { WhoToFollow } from "./WhoToFollow";

export const RightSideSection = () => {
  return (
    <div className="h-screen w-full pt-8 lg:px-8 px-2 flex flex-col item-center justify-start gap-4">
      <Search />
      <Trend />
      <WhoToFollow />
    </div>
  );
};
