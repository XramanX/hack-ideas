import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/userSlice";
const NavBar = ({ onAddChallengeClick, title }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
  dispatch(setUser({}));
  router.push("/");
  };
  return (
    <nav className="flex justify-between items-center lg:flex-row">
    <div className="left">
      <h1 className="text-4xl">{title}</h1>
    </div>
    <div className="right flex">
      <button
        onClick={onAddChallengeClick}
        className="flex items-center bg-white text-blue-500 rounded-md p-2 hover:bg-gray-100 transition duration-300 mr-2"
      >
        Add Challenge
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center bg-white text-red-500 rounded-md p-2 hover:bg-gray-100 transition duration-300"
      >
        Logout
      </button>
    </div>
  </nav>
  );
};

export default NavBar;
