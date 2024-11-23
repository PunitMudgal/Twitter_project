import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResult } from "../store/authSlice";
import { searchUser } from "../fetch/helper";
import FriendWidget from "./widget/FriendWidget";

function Search() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchMenu, setSearchMenu] = useState(false);

  const searchResult = useSelector((state) => state.auth?.searchResult);

  const submitSearch = async () => {
    if (searchText) {
      const data = await searchUser(searchText.toLocaleLowerCase());
      dispatch(setSearchResult(data));
    }
  };

  useEffect(() => {
    if (searchMenu) {
      const timer = setTimeout(() => submitSearch(), 400);

      //clean up function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchText]);

  return (
    <>
      <div className=" mx-[4%] flex items-center gap-2  bg-gray-900 border border-gray-700 p-1 my-1 rounded-3xl ">
        <img
          src={searchIcon}
          alt="search"
          className="h-8 p-2 w-auto invert"
          onClick={submitSearch}
        />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          placeholder="Search"
          className="text-sm bg-transparent flex-grow p-1 focus:outline-2 outline-purple-600 "
          onFocus={() => setSearchMenu(true)}
          onBlur={() => setSearchMenu(false)}
        />
      </div>
      {searchMenu && (
        <div className="p-2 rounded absolute top-[50px] left-12 shadow-md shadow-gray-700 bg-slate-950 ">
          {!searchResult ? (
            <p>No Result!</p>
          ) : (
            searchResult.map((user) => (
              <FriendWidget key={user._id} {...user} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Search;
