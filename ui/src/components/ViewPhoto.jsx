import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

function ViewPhoto() {
  const { id } = useParams();
  const { profilePicturePath } =
    useSelector((state) => state.auth.friendProfile) || {};
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen w-full overflow-hidden text-white">
      <RxCross1
        className="text-3xl absolute top-5 left-4 cursor-pointer "
        onClick={() => navigate(-1)}
      />
      <img
        className="object-cover m-4 h-[85%] md:h-auto md:w-[90%] rounded-md  "
        src={`http://localhost:1414/assets/${profilePicturePath}`}
        alt="profile photo"
      />
    </div>
  );
}

export default ViewPhoto;
