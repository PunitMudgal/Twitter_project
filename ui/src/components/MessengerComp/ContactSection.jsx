import React from "react";
import Search from "../Search";
import { useDispatch, useSelector } from "react-redux";
import FriendWidget from "../widget/FriendWidget";
import { ContactsLoading } from "../Loading";
import { setSelectedContact } from "../../store/chatSlice";
import Avatar from "../Avatar";

function ContactSection() {
  const dispatch = useDispatch();
  const { contacts, isContactsLoading } = useSelector((state) => state?.chat);

  return (
    <div className="w-2/5 border-l border-purple-700 p-1 space-y-2 overflow-x-hidden flex flex-col md:items-center md:w-1/4 ">
      <h2 className="font-semibold text-gray-200 text-xl h-[48px] md:text-base">
        Messages
      </h2>
      <div className="sm:hidden ">
        <Search />
      </div>
      <div className="">
        {isContactsLoading ? (
          <ContactsLoading />
        ) : (
          contacts?.map((contact) => (
            <div
              className="cursor-pointer"
              onClick={() => dispatch(setSelectedContact(contact))}
              key={contact._id}
            >
              <FriendWidget {...contact.participants[0]} isContact={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactSection;
