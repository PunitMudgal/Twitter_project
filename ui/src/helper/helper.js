import axios from "axios";
import jwt_decode from "jwt-decode";
// import dotenv from "dotenv";

// dotenv.config();
// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:1414";

/** REGISTER USER */
export async function registerUser(userData) {
  try {
    await axios.post(`/auth/register`, userData);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** LOGIN USER */
export async function loginUser({ emailOrUsername, password }) {
  try {
    const { data } = await axios.post("/auth/login", {
      emailOrUsername,
      password,
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Wrong Credentials" });
  }
}
