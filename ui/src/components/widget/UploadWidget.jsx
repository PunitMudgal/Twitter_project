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

function UploadWidget({ setPosts }) {
  const user = useSelector(selectUser);

  const { _id, profilePicturePath } = user;

  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [prevPhoto, setPrevPhoto] = useState(null);

  const postPhotoHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPrevPhoto(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (photo) {
      formData.append("picturePath", photo);
    }

    // Debug: Log FormData
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const uploadPromise = createPost(formData);
    toast.promise(uploadPromise, {
      loading: "Upload Please Wait...",
      success: "Upload Successful",
      error: "Upload Error",
    });
    uploadPromise.then((data) => {
      setPosts((prevPosts) => [data, ...prevPosts]);
      setPhoto(null);
      setPrevPhoto(null);
      setText("");
    });
  };

  return (
    <div className="px-2 py-3 border-b border-purple-700 w-full h-fit">
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
            onChange={postPhotoHandle}
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
