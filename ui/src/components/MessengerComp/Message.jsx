import React from "react";
import deleteIcon from "../../assets/delete.png";
import { deleteMessage } from "../../store/chatSlice";
import { useDispatch } from "react-redux";

function Message({ own, text, read, _id }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`flex max-w-fit items-center mb-1 ${own ? "ml-auto" : ""} `}
    >
      {own && (
        <img
          src={deleteIcon}
          onClick={() => dispatch(deleteMessage(_id))}
          alt=""
          className="ml-auto h-7 cursor-pointer "
        />
      )}
      <div
        className={`p-2 rounded-3xl  max-w-fit ${
          own ? " bg-cyan-700 rounded-br-sm " : "bg-gray-700 rounded-bl-sm "
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
