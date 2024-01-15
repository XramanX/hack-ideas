import React from "react";

const NavBar = ({ onAddChallengeClick, title }) => {
  return (
    <nav className="flex justify-between items-center lg:flex-row">
      <div className="left">
        <h1 className="text-4xl">{title}</h1>
      </div>
      <div className="right">
        <button
          onClick={onAddChallengeClick}
          className="flex items-center bg-white text-blue-500 rounded-md p-2 hover:bg-gray-100 transition duration-300"
        >
          Add Challenge
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
