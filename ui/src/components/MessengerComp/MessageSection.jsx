import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";

import { MdCall, MdGif } from "react-icons/md";
import { BsLaptop, BsThreeDots, BsSend } from "react-icons/bs";
import Message from "./Message";
import sendIcon from "../../assets/send.png";
import { IoImageOutline } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import {
  deleteConversation,
  getMessage,
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../../store/chatSlice";
import { useNavigate } from "react-router-dom";

function MessageSection() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth?.user._id);
  const selectedContact = useSelector((state) => state.chat.selectedContact);
  const user = selectedContact?.participants[0] || {};
  const Messages = useSelector((state) => state.chat?.chat);
  const messageEndRef = useRef(null);
  const [text, setText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(sendMessage(selectedContact._id, user._id, text.trim()));
      setText("");
    }
  };

  useEffect(() => {
    if (selectedContact) {
      dispatch(getMessage(selectedContact._id));
      dispatch(subscribeToMessages());
    }
    return () => dispatch(unsubscribeFromMessages());
  }, [selectedContact, dispatch]);

  useEffect(() => {
    if (messageEndRef.current && Messages?.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [Messages]);

  const headerIcons = [
    { icon: <MdCall />, action: null },
    { icon: <BsLaptop />, action: null },
    { icon: <BsThreeDots />, action: () => setMenu(!menu) },
  ];
  console.log("mess", Messages);
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
    <div className="flex-1 flex-grow border-x border-purple-700 relative ">
      {/* chat header */}
      <div className="w-full sticky top-0 p-2 flex justify-between items-center border-b border-gray-700 bg-slate-900 z-10">
        <div className="flex gap-2">
          <Avatar profilePhoto={user.profilePicturePath} userId={user._id} />
          <p
            className="font-semibold self-center text-lg hover:underline cursor-pointer outline-offset-2 "
            onClick={() => navigate(`/home/${user._id}`)}
          >
            {user.name}
          </p>
        </div>
        <div className="flex gap-1">
          {headerIcons.map((icn) => (
            <p
              key={icn.icon}
              onClick={icn.action}
              className=" p-2 text-lg cursor-pointer rounded-full bg-opacity-40 bg-purple-700 hover:bg-opacity-300"
            >
              {icn.icon}{" "}
            </p>
          ))}
          {menu && (
            <div
              onClick={() => dispatch(deleteConversation(selectedContact._id))}
              className="cursor-pointer absolute top-12 z-20 p-2 right-5 rounded-md bg-red-700  font-semibold "
            >
              Delete Chat
            </div>
          )}
        </div>
      </div>

      {/* message + send section */}
      <div>
        {/* Chat body */}
        <div
          ref={messageEndRef}
          className="chat-bg flex-grow min-h-[calc(100vh-134px)] overflow-y-auto  backdrop-blur-sm p-1"
        >
          {Messages.map((msg) => (
            <Message
              key={msg._id}
              {...msg}
              own={currentUserId === msg.sender}
            />
          ))}
        </div>
        {/* send message  */}
        <div className="max-h-fit sticky bottom-0 border-t border-gray-700 w-full bg-gray-950 px-3 py-2 z-10">
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
            <BsSend
              className="text-3xl mr-1 cursor-pointer "
              onClick={handleSendMessage}
            />
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default MessageSection;
