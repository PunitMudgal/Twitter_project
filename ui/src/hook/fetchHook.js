import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken } from ".././helper/helper.js";
import { useEffect, useMemo, useState } from "react";
import { setFriendProfile, setUser } from "../store/authSlice.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:1414";

export default function useFetchHook(query) {
  const user = useSelector((state) => state.auth.user);

  console.log("useFetchHook called");
  const dispatch = useDispatch();
  // Memoize token to prevent recomputation on every render
  // const token = useMemo(() => localStorage.getItem("token"), []);
  const token = localStorage.getItem("token");

  const [getData, setData] = useState({
    isLoading: false,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    console.log("useEffect called");
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const endpoint = query
          ? `/user/${query}`
          : `/user/${await getUserIdFromToken()}`;
        const { data, status } = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (status === 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            status,
          }));
          !query ? dispatch(setUser(data)) : dispatch(setFriendProfile(data));
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

    token && fetchData();
  }, [token, query, dispatch]);

  return [getData, setData];
}

// Mock function to simulate getting user ID from token
const getUserIdFromToken = async () => {
  const { userId } = await getUserFromToken();
  return userId;
};
