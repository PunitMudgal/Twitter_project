import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:1414"
      : "https://twitter-project-iaku.onrender.com",
  withCredentials: true,
});
