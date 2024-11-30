import React from "react";

function Message({ own, text, sender, read }) {
  return (
    <div
      className={`mb-1 p-2 rounded-3xl  max-w-fit ${
        own
          ? " bg-purple-700 rounded-br-sm ml-auto "
          : "bg-gray-700 rounded-bl-sm "
      }`}
    >
      {text}
    </div>
  );
}

export default Message;
