import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <label
      className={`flex items-center gap-2 bg-white border-1 border-gray-200 text-gray-800 w-60 h-9.5 px-2 rounded-[5px]`}
    >
      <Search className="h-4 w-4 text-gray-400" />
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="grow bg-transparent outline-none text-sm placeholder-gray-400"
        placeholder={placeholder}
      />
    </label>
  );
};

export default SearchBar;