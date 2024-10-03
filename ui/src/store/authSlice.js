import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  friendProfile: null,
  token: localStorage.getItem("token") || null,
};

// Truncate the username if it exceeds 14 characters
export const truncateUsername = (username) => {
  if (username?.length > 18) {
    return username.slice(0, 15) + "...";
  }
  return username;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFriendProfile: (state, action) => {
      state.friendProfile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { setUser, setToken, setFriendProfile } = authSlice.actions;
export default authSlice.reducer;
