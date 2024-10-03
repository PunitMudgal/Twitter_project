import Avatar from "../Avatar";
import tick from "../../assets/tick.png";
import logo from "../../assets/white.png";
import moreIcon from "../../assets/more.svg";
import menuIcon from "../../assets/menu.svg";
import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/user.svg";
import searchIcon from "../../assets/search.svg";
import premiumIcon from "../../assets/premium.svg";
import messageIcon from "../../assets/envelope.svg";
import notificationIcon from "../../assets/bell.svg";
import businessIcon from "../../assets/lightning.svg";
import communitiesIcon from "../../assets/communities.svg";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, truncateUsername } from "../../store/authSlice";

function LeftComp() {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, isAdmin, username } = useSelector(
    (state) => state.auth?.user || {}
  );

  const Icons = [
    { name: "home", icon: homeIcon },
    { name: "search", icon: searchIcon },
    { name: "notification", icon: notificationIcon },
    { name: "message", icon: messageIcon },
    { name: "commuinities", icon: communitiesIcon },
    { name: "business", icon: businessIcon },
    { name: "profile", icon: profileIcon },
    { name: "more", icon: moreIcon },
    { name: "premium", icon: premiumIcon },
  ];

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false); // Close the menu
      }
    };

    // Add event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="col-span-3 flex flex-col justify-between relative ">
        {/* head logo */}
        <div className="sticky top-0 mx-auto bg-gray-00 w-full h-12 mb-2 ">
          <img src={logo} alt="forever_logo" className=" h-11 w-auto m-auto" />
        </div>

        {/* icons */}
        <div className="flex flex-col place-items-start gap-3 ml-[37%] p-3 font-style2">
          {Icons.map((icon) => (
            <Link
              key={icon.name}
              className="flex gap-3 text-xl items-center p-2 rounded-3xl capitalize  hover:bg-purple-500 hover:bg-opacity-20 "
            >
              <img src={icon.icon} className="h-7 w-full invert " alt="icon" />
              <span>{icon.name}</span>
            </Link>
          ))}

          <button className="rounded-3xl p-2 w-full bg-violet-70 purple-gradient">
            Post
          </button>
        </div>

        {/* profile at bottom */}
        <div
          onClick={() => setMenu(true)}
          className="flex gap-2 items-center p-2 ml-[37%] text-sm font-semibold mt-auto rounded-3xl hover:bg-purple-500 hover:bg-opacity-20 "
        >
          <Avatar />
          <div className="flex flex-col">
            <p className="flex gap-1 items-center capitalize">
              {truncateUsername(name)}
              {isAdmin && (
                <img src={tick} className="h-4 w-4" alt="purpletick" />
              )}
            </p>
            <p className="text-gray2 text-xs">@{truncateUsername(username)}</p>
          </div>
          <img className="h-4 w-4 ml-auto invert " src={menuIcon} alt="menu" />
        </div>

        {/* logout menu */}
        {menu && (
          <div
            ref={menuRef}
            className="absolute bottom-[10%] left-[34%] bg-blue6 rounded-md py-2 shadow-md shadow-purple-900 flex flex-col font-bold w-[65%]"
          >
            <Link to="/signin" className="hover:bg-blue4 p-2">
              Login another account
            </Link>
            <Link
              to="/signin"
              onClick={() => dispatch(setToken(null))}
              className="hover:bg-blue4 p-2"
            >
              Logout @{username}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default LeftComp;
