import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";

import { MdCall, MdGif } from "react-icons/md";
import { BsLaptop, BsThreeDots } from "react-icons/bs";
import Message from "./Message";
import sendIcon from "../../assets/send.png";
import { IoImageOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { getMessage, sendMessage } from "../../store/chatSlice";

function MessageSection() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth?.user._id);
  const selectedContact = useSelector((state) => state.chat.selectedContact);
  const user = selectedContact?.participants[0];
  const Messages = useSelector((state) => state.chat?.chat);

  const [text, setText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessage(selectedContact._id, text));
    setText("");
  };

  useEffect(() => {
    selectedContact && dispatch(getMessage(selectedContact?._id));
  }, [selectedContact?._id, getMessage]);

  const headerIcons = [
    { icon: <MdCall />, action: null },
    { icon: <BsLaptop />, action: null },
    { icon: <BsThreeDots />, action: null },
  ];

  if (selectedContact === null) {
    return (
      <div className="flex-grow border-x border-purple-700 h-full flex justify-center items-center">
        <p className="font-semibold text-5xl  text-gray-200 font-style3 opacity-45 flex-wrap">
          Select a contact to chat
        </p>
      </div>
    );
  }
  return (
    <div className="h-screen flex-grow border-x border-purple-700 p-1">
      {/* chat header */}
      <div className="w-full h-[60px] sticky px-2 flex justify-between items-center border-b border-gray-700 ">
        <div className="flex gap-2">
          <Avatar profilePhoto={user.profilePicturePath} userId={user._id} />
          <p className="font-semibold self-center text-lg ">{user.name}</p>
        </div>
        <div className="flex gap-1">
          {headerIcons.map((icn) => (
            <p
              key={icn.icon}
              className=" p-2 text-lg cursor-pointer rounded-full bg-opacity-40 bg-purple-700 hover:bg-opacity-300"
            >
              {icn.icon}{" "}
            </p>
          ))}
        </div>
      </div>

      <div className=" min-h-[calc(100vh-60px)] overflow-auto">
        {Messages.map((msg) => (
          <Message key={msg._id} {...msg} own={currentUserId === msg.sender} />
        ))}

        {/* send message  */}
        <div className="max-h-fit sticky bottom-0 border-t border-gray-700 w-full px-3 py-2">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center bg-gray-800 w-full rounded-2xl px-3"
          >
            <div className="flex gap-2  text-xl">
              <IoImageOutline />
              <MdGif className="border rounded-md" />
              <GrEmoji />
            </div>
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              placeholder="Write Message!!!"
              className="bg-transparent w-full p-3"
            />
            <img src={sendIcon} className="h-9 p-1 " type="submit" alt="send" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageSection;
