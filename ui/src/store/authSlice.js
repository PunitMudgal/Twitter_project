import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../fetch/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

const initialState = {
  user: null,
  isCheckingAuth: true,
  currentFollowing: [],
  socket: null,
  onlineUsers: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
    setCurrentFollowing: (state, action) => {
      state.currentFollowing = action.payload;
    },
    setAddCurrentFollowing: (state, action) => {
      state.currentFollowing = [...state.currentFollowing, action.payload];
    },
    removeCurrentFollowing: (state, action) => {
      state.currentFollowing = state.currentFollowing.filter(
        (usr) => usr._id !== action.payload
      );
    },
  },
});

// auth check
export const checkAuth = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/auth/check");
    dispatch(setUser(res.data));
    dispatch(connectSocket());
  } catch (error) {
    console.error("Error in checkAuth:", error.message);
  } finally {
    dispatch(setCheckingAuth(false));
  }
};

/** REGISTER USER */
export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, userData);
    dispatch(connectSocket());
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

/** LOGIN USER */
export const loginUser =
  ({ emailOrUsername, password }) =>
  async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        emailOrUsername,
        password,
      });
      dispatch(connectSocket());
      return Promise.resolve({ data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

export const Logout = () => async (dispatch) => {
  try {
    await axiosInstance.get("/auth/logout");
    toast.success("Logout Successfully");
    dispatch(disconnectSocket());
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const connectSocket = () => (dispatch, getState) => {
  const { user, socket } = getState().auth;
  if (!user || socket?.connected) return;

  const newSocket = io(BASE_URL, {
    query: {
      userId: user._id,
    },
  });
  newSocket.on("connect", () => {
    console.log("Socket connected:", newSocket.id);
    dispatch(setSocket(newSocket));
  });

  newSocket.on("getOnlineUsers", (userIds) => {
    console.log("Online users received:", userIds);
    dispatch(setOnlineUsers(userIds)); // Directly update the state with userIds array
  });

  newSocket.on("disconnect", () => {
    console.log("Socket disconnected");
    dispatch(setSocket(null));
  });
};

export const disconnectSocket = () => (dispatch, getState) => {
  const { socket } = getState().auth;

  if (socket?.connected) {
    socket.disconnect();
    console.log("Socket disconnected:", socket.id);
    dispatch(setSocket(null));
  }
};

// Truncate the username if it exceeds 14 characters
export const truncateUsername = (username) => {
  if (username?.length > 18) {
    return username.slice(0, 15) + "...";
  }
  return username;
};

export const selectUser = (state) => state.auth.user || {};

export const {
  setSocket,
  setUser,
  setCheckingAuth,
  setCurrentFollowing,
  setAddCurrentFollowing,
  removeCurrentFollowing,
  setOnlineUsers,
} = authSlice.actions;
export default authSlice.reducer;
