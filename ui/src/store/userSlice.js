import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendProfile: null,
  following: [],
  follower: [],
  searchResult: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFriendProfile: (state, action) => {
      state.friendProfile = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    removeFollowing: (state, action) => {
      state.following = state.following.filter(
        (usr) => usr._id !== action.payload
      );
    },
    setFollower: (state, action) => {
      state.follower = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const {
  setFollowing,
  setFollower,
  setSearchResult,
  removeFollowing,
  setFriendProfile,
} = userSlice.actions;
export default userSlice.reducer;
