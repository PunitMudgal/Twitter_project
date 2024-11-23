import { useDispatch } from "react-redux";
import { getUserFromToken } from "./helper.js";
import { useEffect, useMemo, useState } from "react";
import { setFriendProfile, setUser } from "../store/authSlice.js";
import axios from "axios";
import { axiosInstance } from "./axios.js";

export default function useFetchHook(query) {
  const dispatch = useDispatch();

  const [getData, setData] = useState({
    isLoading: false,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const { data, status } = await axiosInstance.get(`/user/${query}`);

        if (status === 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
          }));
          dispatch(setFriendProfile(data));
        }
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: axios.isAxiosError(error)
            ? error.response?.data
            : "Unexpected Error",
        }));
      }
    };

    fetchData();
  }, [query, dispatch]);

  return [getData, setData];
}
