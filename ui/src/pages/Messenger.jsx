import React from "react";
import LeftComp from "../components/homePageComp/LeftComp";
import ContactSection from "../components/MessengerComp/ContactSection";
import MessageSection from "../components/MessengerComp/MessageSection";

function Messenger() {
  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden lg:flex  ">
      <LeftComp />
      <div className="col-span-8 flex">
        <ContactSection />
        <MessageSection />
      </div>
    </div>
  );
}

export default Messenger;
