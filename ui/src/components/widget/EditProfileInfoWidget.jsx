import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../fetch/helper";
import { toast } from "react-hot-toast";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import defaultPhoto from "../../assets/profile.png";
import { Box, TextField } from "@mui/material";
import { selectUser, setUser } from "../../store/authSlice";
import { setFriendProfile } from "../../store/userSlice";

function EditProfileInfoWidget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [profilePicturePath, setProfilePicturePath] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);

  const [coverPicture, setCoverPicture] = useState(null);
  const [previewBg, setPreviewBg] = useState(null);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const backgroundPhotoHandleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPicture(file);
      setPreviewBg(URL.createObjectURL(file));
    }
  };

  const handleChangeProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicturePath(file);
      setPreviewProfile(URL.createObjectURL(file));
    }
  };

  const handleRemoveBg = () => {
    setPreviewBg(null);
    setCoverPicture(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data object
      const formData = new FormData();
      formData.append("userId", user._id);
      if (name) formData.append("name", name);
      if (bio) formData.append("bio", bio);
      if (location) formData.append("from", location);
      if (profilePicturePath)
        formData.append("profilePicturePath", profilePicturePath);
      if (coverPicture) formData.append("coverPicture", coverPicture);

      // const response = axiosInstance.patch("/user/update", formData);
      const response = updateUser(formData);
      await toast.promise(response, {
        loading: "Updating...",
        success: "Update Successful",
        error: (error) => error.response.data.message || "Error!",
      });
      response.then((data) => {
        dispatch(setUser(data));
        dispatch(setFriendProfile(data));
      });
      navigate(-1);
    } catch (error) {
      console.error("Error During Update:", error);
      toast.error("Update failed, please try again.");
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 overflow-hidden  bg-gray-700 bg-opacity-60 h-screen w-full z-10">
        {/* edit box */}
        <div className="absolute top-[6%] bg-black text-gray-400 left-1/2 transform -translate-x-1/2  w-[40%] shadow rounded-md">
          {/* upper part of widget */}
          <div className="flex items-center gap-8 justify-between  p-3 font-semibold">
            <RxCross1
              className="cursor-pointer text-xl"
              onClick={() => navigate(-1)}
            />
            <p className=" text-left text-xl">Edit Profile</p>
            <button
              type="submit"
              className="bg-gray-100 rounded-3xl text-black px-3 py-1  "
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>

          {/* lower part below header */}
          <Box
            onSubmit={handleSubmit}
            className="flex flex-col relative"
            component="form"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#5f6a6a", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#5f6a6a", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#7d3c98", // Border color when focused
                },
              },
              input: { color: "#a6acaf" }, // Input text color
              label: { color: "#5f6a6a" }, // Label text color

              // Target multiline text fields
              "& .MuiInputBase-multiline": {
                color: "#a6acaf", // Input text color for multiline (Bio) text field
              },
            }}
            noValidate
            autoComplete="off"
          >
            {/* background photo */}
            <div className="relative bg-zinc-800 w-full h-[200px] flex justify-center items-center ">
              <>
                <div className="absolute flex gap-1 left-[45%] top-[42%] text-3xl justify-center items-center ">
                  <label
                    htmlFor="coverPicture"
                    className="p-2 rounded-full bg-gray-700 bg-opacity-45 hover:bg-opacity-75 "
                  >
                    <MdOutlineAddAPhoto />
                  </label>
                  {previewBg ||
                    (user?.coverPicture && (
                      <RxCross1
                        onClick={handleRemoveBg}
                        className="p-1 text-5xl rounded-full bg-gray-700 bg-opacity-45 hover:bg-opacity-75"
                      />
                    ))}
                </div>
                <input
                  accept="image/*"
                  onChange={backgroundPhotoHandleChange}
                  type="file"
                  name="coverPicture"
                  id="coverPicture"
                  style={{ display: "none" }}
                />
              </>
              {/* showing bg imgage */}
              {previewBg ||
                (user?.coverPicture && (
                  <img
                    src={previewBg || user.coverPicture}
                    className="w-full h-full object-cover  "
                    alt="avatar"
                  />
                ))}
              {/* )} */}
            </div>

            {/* profile picture  */}
            <div className="">
              <label
                htmlFor="profilePicture"
                className="absolute top-[25%] left-5 h-32 w-32 border-2 rounded-full overflow-hidden cursor-pointer"
              >
                <img
                  className="h-full w-full object-cover "
                  src={
                    previewProfile || user.profilePicturePath || defaultPhoto
                  }
                  alt="profile"
                />
              </label>
              <input
                accept="image/*"
                onChange={handleChangeProfilePicture}
                type="file"
                name="profilePicture"
                id="profilePicture"
                style={{ display: "none" }}
              />
            </div>
            <div className="flex flex-col gap-3 p-5  mt-16">
              <TextField
                id="standard-basic"
                label="Name"
                variant="outlined"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <TextField
                id="outlined-basic"
                label="Bio"
                name="bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                multiline
                rows={4}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Location"
                name="from"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                variant="outlined"
              />
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default EditProfileInfoWidget;
