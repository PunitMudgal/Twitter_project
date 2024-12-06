import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../style/authenticationStyle.css";
import logo from "../assets/blue.png";
import { loginVerify } from "../helper/validation.js";
import toast, { Toaster } from "react-hot-toast";
import { checkAuth, loginUser } from "../store/authSlice";
import { useDispatch } from "react-redux";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validate: loginVerify,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      let loginPromise = dispatch(loginUser(values));
      toast.promise(loginPromise, {
        loading: "Logging In...",
        success: "Login Success",
        error: "Login Failed!",
      });
      loginPromise.then((data) => {
        localStorage.setItem("token", data.token);
        dispatch(checkAuth());
        navigate("/home");
      });
    },
  });

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-[1vh] p-[4%] ">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex flex-col gap-3 justify-center items-center">
          <img src={logo} alt="logo not found!" className="h-28 w-28 " />
          <p className="font-semibold text-2xl font-style1 md:text-xl">
            Welcome back User
          </p>
        </div>
        <Box
          onSubmit={handleSubmit}
          className="authntication-form flex-auto"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
            // Root class for the input field
            "& .MuiFilledInput-root": {
              color: "#d0dbe4",
            },
            // Class for the label of the filled input field
            "& .MuiInputLabel-filled": {
              color: "#76d7c4",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="emailOrUsername"
            className="authntication-input"
            value={values.emailOrUsername}
            onChange={handleChange}
            label="Email or Username"
            variant="filled"
          />
          <TextField
            inert
            name="password"
            className="authntication-input"
            value={values.password}
            type="password"
            onChange={handleChange}
            label="Password"
            variant="filled"
          />

          <button type="submit" className="p-2 rounded-3xl bg-sky-500">
            Sign In
          </button>
        </Box>

        <div className="flex flex-col text-center flex-auto justify-start">
          <p className="text-sm">Don't have any account?</p>
          <Link
            to="/"
            className="p-2 px-4 mt-2 w-full rounded-3xl border-2 border-sky-400 font-semibold hover:bg-sky-500 "
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignIn;
