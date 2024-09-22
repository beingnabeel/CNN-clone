// SearchBox.js

import React from "react";

const SearchBox = ({ searchText, onSearch, onClear, onSearchInputChange }) => {
  return (
    <div className="flex items-center px-20 mt-4 w-full">
      <div className="flex border border-black rounded my-4 w-full">
        <input
          className="p-2 flex-grow border-r-none outline-none"
          value={searchText}
          onChange={(e) => onSearchInputChange(e.target.value)}
          placeholder="Type here..."
        />
        <button className=" p-2 text-black flex items-center" onClick={onClear}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          Clear
        </button>
        <button className="bg-red-500 text-white p-2" onClick={onSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
