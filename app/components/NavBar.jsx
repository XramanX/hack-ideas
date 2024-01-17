import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "../store/userSlice";

const NavBar = ({ onAddChallengeClick, title, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);
  const handleLogout = () => {
    localStorage.removeItem("employeeId");
    localStorage.removeItem("displayName");
    dispatch(setUser({}));
    router.push("/");
  };

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex w-4/5 justify-content items-center fixed top-0 bg-gray-700 lg:w-full lg:bg-transparent z-50 p-2 lg:flex-row">
      <div className="left">
        <h1 className="text-4xl  cursor-pointer p-2 font-bold">{title}</h1>
      </div>
      <div className="right flex items-center">
        <button
          onClick={onAddChallengeClick}
          className="flex items-center bg-transparent text-gray-100 rounded-md p-2 hover:text-blue-500 transition duration-300 mr-2"
        >
          <IoIosAddCircleOutline size={30} />
        </button>
        <div className="relative">
          <button
            onClick={handleAvatarClick}
            className="flex items-center w-7 h-7 bg-whie bg-white text-black rounded-full p-2 hover:bg-blue-500 hover:text-white transition duration-300"
          >
            {user && (
              <div className=" rounded-full flex items-center justify-center">
                {user[0].toUpperCase()}
              </div>
            )}
          </button>
          {isMenuOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md p-2"
            >
              <button
                onClick={handleLogout}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                Logout
                <LuLogOut className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
