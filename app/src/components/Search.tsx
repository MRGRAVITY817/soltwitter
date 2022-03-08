import { SearchIcon } from "@heroicons/react/outline";
export const Search = () => {
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-full bg-gray-100 px-4 py-2 flex items-center justify-start gap-4"
      >
        <SearchIcon className="w-8 h-8 text-indigo-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none text-lg bg-transparent w-32"
        />
      </form>
    </>
  );
};
