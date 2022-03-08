import { CogIcon } from "@heroicons/react/outline";
export const Trend = () => {
  return (
    <section className="bg-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h2>Trends for you</h2>
        <CogIcon className="w-8 h-8" />
      </div>
    </section>
  );
};
