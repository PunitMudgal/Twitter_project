import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chat: chatSlice,
  },
});
export default store;
