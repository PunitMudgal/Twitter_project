import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import skipIcon from "../assets/next.svg";
import "../style/registerProfile.css";
import { updateUser } from "../fetch/helper";
import avatar from "../assets/profile.png";

function RegisterProfileCard() {
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      if (name) formData.append("name", name);
      if (image) {
        formData.append("profilePicturePath", image);
      }

      const updatePromise = updateUser(formData);
      toast.promise(updatePromise, {
        loading: "Updating Please wait...",
        success: "Update successful",
        error: "Update Error",
      });
      updatePromise.then(() => {
        setName("");
        setImage(null);
        setPreviewProfile(null);
        navigate("/home");
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Show the error message from backend
      } else {
        toast.error("Registration Failed. Please try again later."); // Fallback for other errors
      }
    }
  };

  return (
    <>
      {/* background blur effect  */}
      <div className="w-full h-full bg-black bg-opacity-55 backdrop-blur-sm absolute top-0 left-0 z-20" />

      {/* profile card */}
      <div className="flex flex-col items-center justify-around p-3 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] rounded-md bg-transparent bg-opacity-5 backdrop-blur-md border border-purple3 md:w-[90%] box z-30">
        <div className="flex  items-center">
          <p className="font-semibold text-xl text-center text-gray-300">
            Set Profile photo
          </p>
          <Link
            to="/home"
            className="absolute inline-flex items-center right-0 hover:underline"
          >
            Skip <img className="h-5 invert w-auto" src={skipIcon} alt="skip" />{" "}
          </Link>
        </div>
        <Box
          action="user/update"
          encType={"multipart/form-data"}
          className="flex flex-col gap-3 items-center"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },
            // Root class for the input field
            "& .MuiFilledInput-root": {
              color: "#f2f3f4",
            },
            // Class for the label of the filled input field
            "& .MuiInputLabel-filled": {
              color: "#aed6f1",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <>
            <img
              src={previewProfile || avatar}
              className=" w-32 h-32 border-2 object-cover border-blue2 rounded-full  hover:border-blue1"
              alt="avatar"
            />
            <label
              htmlFor="profile"
              className="text-center cursor-pointer underline underline-offset-4"
            >
              {image?.name || "Upload Photo"}
            </label>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreviewProfile(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              name="picture"
              id="profile"
              style={{ display: "none" }}
            />
          </>
          <TextField
            name="name"
            className="authntication-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Enter Your Name"
            variant="filled"
          />
          <button type="submit" className="p-2 w-[40%] rounded-3xl bg-blue1 ">
            Done
          </button>
        </Box>
      </div>
    </>
  );
}

export default RegisterProfileCard;
