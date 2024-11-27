import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

function ViewPhoto() {
  const { picturePath } = useParams();
  const decodedPath = decodeURIComponent(picturePath);

  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full overflow-hidden text-white">
      <RxCross1
        className="text-3xl absolute top-5 left-4 cursor-pointer "
        onClick={() => navigate(-1)}
      />
      <img
        className="object-cover m-4 h-[85%] md:h-auto md:w-[90%] rounded-md  "
        src={decodedPath}
        alt="profile photo"
      />
    </div>
  );
}

export default ViewPhoto;
