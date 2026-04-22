import { Search } from "lucide-react";
import React from "react";

const Searchbar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target[0].value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto w-full"
    >
      <div className="flex items-center gap-4 px-4 py-1">
        <div className="flex-1 relative">
          <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 size-5 dark:text-gray-500 text-gray-400" />
          <input
            type="text"
            placeholder="Coin ara ..."
            className="w-full pl-10 p-4 outline-none dark:text-gray-100 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Ara
        </button>
      </div>
    </form>
  );
};

export default React.memo(Searchbar);
