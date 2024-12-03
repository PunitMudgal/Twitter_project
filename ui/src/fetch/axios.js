import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_API_URL
      : process.env.REACT_APP_PROD_API_URL,
  withCredentials: true,
});
