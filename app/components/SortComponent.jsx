import React, { useState, useRef, useEffect } from "react";
import { BiSort } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";

function SortComponent({ onSort }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Most Recent");
  const dropdownRef = useRef(null);

  const handleSort = (option, label) => {
    setSelectedSortOption(label);
    setShowDropdown(false);
    onSort(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-end relative">
      <div
        className="mr-2 text-blue-500  cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectedSortOption}
      </div>
      <button
        className="flex items-center text-blue-500 hover:text-blue-700 transition-300"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <BiSort className="ml-2" />
      </button>

      {showDropdown && (
        <div
          className="absolute top-8 right-0 shadow-xl border border-gray-300 rounded-md p-2"
          style={{ backgroundColor: "white", color: "black" }}
          ref={dropdownRef}
        >
          <button
            className="flex w-full items-center  hover:text-blue-700 cursor-pointer"
            onClick={() => handleSort("created-desc", "Most Recent")}
          >
            Most Recent
          </button>
          <button
            className="flex w-full items-center  hover:text-blue-700 cursor-pointer"
            onClick={() => handleSort("created-asc", "Oldest")}
          >
            Oldest
          </button>
          <button
            className="flex w-full items-center  hover:text-blue-700 cursor-pointer"
            onClick={() => handleSort("votes-desc", "Votes: high to low")}
          >
            Votes: high to low
          </button>
          <button
            className="flex w-full items-center  hover:text-blue-700 cursor-pointer"
            onClick={() => handleSort("votes-asc", "Votes: low to high")}
          >
            Votes: low to high
          </button>
        </div>
      )}
    </div>
  );
}

export default SortComponent;
