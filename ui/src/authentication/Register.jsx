import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Toaster, toast } from "react-hot-toast";

import "../style/authenticationStyle.css";
import logo from "../assets/blue.png";
import { registerValidation } from "../helper/validation.js";
import { registerUser } from "../helper/helper";

function Register() {
  const navigate = useNavigate();
  const [isConfPassCorrenct, setIsconfPassCorrect] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      values = await Object.assign(values);
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: "Register Successful",
        error: "Registration Failed",
      });
      registerPromise.then(function () {
        navigate("/home");
      });
    },
  });

  return (
    <div className="text-gray-200 flex flex-col justify-center items-center gap-[4vh] p-[5%]">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex flex-col gap-3 justify-center items-center">
        <img src={logo} alt="logo not found!" className="h-28 w-28 " />
        <p className="font-semibold text-2xl font-style1 md:text-xl">
          Join <span className="text-sky-300">Forever</span> Today
        </p>
      </div>
      <Box
        onSubmit={handleSubmit}
        className="authntication-form flex-auto"
        component="form"
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
        <TextField
          name="username"
          className="authntication-input"
          value={values.username}
          onChange={handleChange}
          label="Username"
          variant="filled"
        />
        <TextField
          name="email"
          className="authntication-input"
          value={values.email}
          onChange={handleChange}
          label="Email"
          variant="filled"
        />
        <TextField
          name="password"
          inert={true}
          className="authntication-input"
          value={values.password}
          type="password"
          onChange={handleChange}
          label="Password"
          variant="filled"
        />
        <TextField
          name="confirmPassword"
          onBlur={() =>
            values.password !== values.confirmPassword
              ? setIsconfPassCorrect(true)
              : setIsconfPassCorrect(false)
          }
          error={isConfPassCorrenct}
          className="authntication-input"
          value={values.confirmPassword}
          type="password"
          onChange={handleChange}
          label="Confirm Password"
          variant="filled"
        />

        <button type="submit" className="p-2 w-[30%] rounded-3xl bg-sky-500">
          Register
        </button>
      </Box>

      <div className="flex flex-col text-center flex-auto justify-around">
        <p className="text-sm">Already have an account?</p>
        <Link
          to="/signin"
          className="p-2 px-4 mt-2 w-full rounded-3xl border-2 border-sky-400 font-semibold hover:bg-sky-500 "
        >
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Register;
