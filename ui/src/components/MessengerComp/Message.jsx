import React from "react";
import deleteIcon from "../../assets/delete.png";
import { deleteMessage } from "../../store/chatSlice";
import { useDispatch } from "react-redux";
import { formatTimeTo12Hour } from "../../fetch/helper";

function Message({ own, text, read, _id, createdAt }) {
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
        className={`p-2 pb-0 pl-4 rounded-3xl  max-w-sm text-left flex-wrap ${
          own ? " bg-cyan-700 rounded-br-sm " : "bg-gray-700 rounded-bl-sm "
        }`}
      >
        <p>{text}</p>
        <span className="text-xs text-white p-1 float-right">
          {formatTimeTo12Hour(createdAt)}
        </span>
      </div>
    </div>
  );
}

export default Message;
