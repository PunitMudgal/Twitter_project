import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:1414";

export async function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Token not found!");
  let decode = jwtDecode(token);
  return decode;
}

/** REGISTER USER */
export async function registerUser(userData) {
  try {
    const response = await axios.post(`/auth/register`, userData);
    return response;
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

/** UPDATE USER */
export async function updateUser(values, token) {
  try {
    await axios.patch("/user/update", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
    console.error("error response", error.response);
    throw new Error("Wrong Credentials");
  }
}
