import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../fetch/axios";

const initialState = {
  user: null,
  isCheckingAuth: true,
  currentFollowing: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
  } catch (error) {
    console.error("Error in checkAuth:", error);
  } finally {
    dispatch(setCheckingAuth(false));
  }
};

// Truncate the username if it exceeds 14 characters
export const truncateUsername = (username) => {
  if (username?.length > 18) {
    return username.slice(0, 15) + "...";
  }
  return username;
};

// export const selectUser = createSelector(
//   (state) => state.auth.user,
//   (user) => user || {} // Provide an empty object if user is null or undefined
// );

export const selectUser = (state) => state.auth.user || {};

export const {
  setUser,
  setCheckingAuth,
  setCurrentFollowing,
  setAddCurrentFollowing,
  removeCurrentFollowing,
} = authSlice.actions;
export default authSlice.reducer;
