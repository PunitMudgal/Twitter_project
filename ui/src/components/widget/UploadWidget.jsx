import React, { useState } from "react";
import Avatar from "../Avatar";
import {
  IoImageOutline,
  IoCalendarOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MdGif } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { GrEmoji } from "react-icons/gr";
import { useSelector } from "react-redux";
import { createPost } from "../../fetch/helper";
import toast from "react-hot-toast";
import { selectUser } from "../../store/authSlice";

function UploadWidget() {
  const user = useSelector(selectUser);

  const { _id, profilePicturePath } = user;

  const token = useSelector((state) => state.auth?.token);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [prevPhoto, setPrevPhoto] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("text", text);
    if (photo) {
      formData.append("picture", photo);
      formData.append("picturePath", photo.name);
    }
    const uploadPromise = createPost(formData, token);
    toast.promise(uploadPromise, {
      loading: "upload Please wait...",
      success: "upload successful",
      error: "upload Error",
    });
    await uploadPromise;
    setPhoto(null);
    setPrevPhoto(null);
    setText("");
  };

  return (
    <div className="p-4 border-b border-purple-700 w-full h-fit">
      <div className="flex gap-2 w-full items-start ">
        <Avatar
          className="flex-shrink-0  "
          profilePhoto={profilePicturePath}
          userId={_id}
        />
        <div className="flex-grow flex flex-col">
          <textarea
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="bg-transparent text-white text-lg p-2 placeholder:text-gray1 "
            placeholder="What is happening?!"
          />
          {prevPhoto && (
            <div className="relative">
              <RxCross1
                className="absolute text-4xl cursor-pointer top-2 right-2 p-2 bg-gray-700 bg-opacity-60 rounded-full "
                onClick={() => setPrevPhoto(null)}
              />
              <img
                src={prevPhoto}
                className="rounded-lg w-full bg-local "
                alt="preview"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-5 pl-[3.4rem] pt-3  text-violet-400">
        <div className="flex gap-3 text-xl cursor-pointer">
          <label htmlFor="photo" className="cursor-pointer">
            <IoImageOutline />
          </label>
          <input
            type="file"
            id="photo"
            style={{ display: "none" }}
            onChange={(e) => {
              setPhoto(e.target.files[0]);
              setPrevPhoto(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <MdGif className="border rounded-md border-gray-400" />
          <CgOptions />
          <GrEmoji />
          <IoCalendarOutline />
          <IoLocationOutline />
        </div>
        <button
          onClick={handleUpload}
          className="bg-violet-500 text-gray-100 rounded-xl px-4 py-1 "
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default UploadWidget;
