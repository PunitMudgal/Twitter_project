import React, { useEffect } from "react";
import LeftComp from "../components/homePageComp/LeftComp";
import ContactSection from "../components/MessengerComp/ContactSection";
import MessageSection from "../components/MessengerComp/MessageSection";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../store/chatSlice";

function Messenger() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

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
