import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import "../style/authenticationStyle.css";
import logo from "../assets/blue.png";
import { registerValidation } from "../helper/validation.js";

function SignIn() {
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-[1vh] p-[4%] ">
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
            name="email"
            className="authntication-input"
            value={values.email}
            onchange={handleChange}
            onBlur={handleBlur}
            label="Email"
            variant="filled"
          />
          <TextField
            inert
            name="password"
            className="authntication-input"
            value={values.password}
            type="password"
            onchange={handleChange}
            onBlur={handleBlur}
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
