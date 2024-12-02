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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["auth.socket"], // Ignore the socket field
        ignoredActions: ["auth/setSocket"], // Ignore actions related to the socket
      },
    }),
});
export default store;
