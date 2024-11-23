import React from "react";
import Search from "../Search";

function ContactSection() {
  return (
    // !mail regestration
    <div className="w-2/5 border-l border-purple-700 p-1 ">
      <div>
        <h2 className="font-bold text-gray-200 text-xl h-[48px]">Messages</h2>
        <Search />
      </div>
      <div></div>
    </div>
  );
}

export default ContactSection;
