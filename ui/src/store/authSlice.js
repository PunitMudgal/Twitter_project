import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  friendProfile: null,
  following: [],
  follower: [],
  token: localStorage.getItem("token") || null,
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
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setFollower: (state, action) => {
      state.follower = action.payload;
    },
  },
});

// Truncate the username if it exceeds 14 characters
export const truncateUsername = (username) => {
  if (username?.length > 18) {
    return username.slice(0, 15) + "...";
  }
  return username;
};

// Fetch user's friends

export const {
  setUser,
  setToken,
  setFriendProfile,
  setFollowing,
  setFollower,
} = authSlice.actions;
export default authSlice.reducer;
