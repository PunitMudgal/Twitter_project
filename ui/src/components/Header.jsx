import React from "react";
import logo from ".././assets/white.png";
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <div className="grid grid-cols-12 items-center ">
      {/* logo  */}
      <img
        src={logo}
        alt="forever_logo"
        className="h-12 w-auto col-span-3 m-auto p-1"
      />

      {/* feed  */}
      <div className="col-span-5 flex font-style2 self-center text-center text-lg text-gray1 border-purple-700 border-x border-b h-full">
        <button className="flex-1 hover:bg-violet-600 hover:bg-opacity-20">
          For You
        </button>
        <button className="flex-1 hover:bg-violet-600 hover:bg-opacity-20">
          Following
        </button>
      </div>

      {/* search bar  */}
      <div className="flex items-center gap-2 col-span-3 m-auto bg-gray-900 px-5 py-[10px] rounded-3xl">
        <FiSearch />
        <input
          type="text"
          placeholder="Search"
          className="text-sm bg-transparent "
        />
      </div>
    </div>
  );
}

export default Header;
