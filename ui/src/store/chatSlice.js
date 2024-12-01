import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../fetch/axios";
import userSlice from "./userSlice";
import axios from "axios";

const initialState = {
  chat: [],
  contacts: [],
  selectedContact: null,
  isContactsLoading: true,
  isChatLoading: true,
  chatError: null,
  contactsError: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setAddCurrentChatMessage: (state, action) => {
      state.chat = [...state.chat, action.payload];
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setRemoveDeletedContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (user) => user._id !== action.payload
      );
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    setIsContactsLoading: (state, action) => {
      state.isContactsLoading = action.payload;
    },
    setIsChatLoading: (state, action) => {
      state.isChatLoading = action.payload;
    },
    setChatError: (state, action) => {
      state.chatError = action.payload;
    },
    setContactsError: (state, action) => {
      state.contactsError = action.payload;
    },
    setAddCreatedContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
  },
});

/** CONVERSATION */

export const getConversations = () => async (dispatch) => {
  try {
    dispatch(setIsContactsLoading(true));
    const response = await axiosInstance.get("/conversation/get-conversations");
    dispatch(setContacts(response.data));
  } catch (error) {
    dispatch(setContactsError(error.message));
    toast.error(error.response.data.message || error.message);
  } finally {
    dispatch(setIsContactsLoading(false));
  }
};

export const CreateConversations =
  ({ currentUserId, friendId }) =>
  async (dispatch) => {
    try {
      const participants = [currentUserId, friendId];
      const response = await axiosInstance.post("/conversation", {
        participants,
      });
      dispatch(setAddCreatedContact(response.data));
    } catch (error) {
      dispatch(setChatError(error.message));
      toast.error(error.response.data.message || error.message);
      console.error("Error in CreateConversations:", error);
    }
  };

export const deleteConversation = (conversationId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.delete(
      `conversation/delete-conversation/${conversationId}`
    );
    dispatch(setRemoveDeletedContact(data._id));
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error in CreateConversations:", error);
  }
};

/** MESSAGE */

export const getMessage = (conversationId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/message/${conversationId}`);
    console.log("chat data", data);
    dispatch(setChat(data));
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error in getting messages:", error);
  }
};

export const sendMessage = (conversationId, text) => async (dispatch) => {
  try {
    const body = { conversationId, text };
    const { data } = await axiosInstance.post(`/message`, body);
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error While Sending Message:", error);
  }
};

export const markAsRead = (messageId) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/message/mark-read/${messageId}`);
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error in Marking as read:", error);
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/message/delete-message/${messageId}`);
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error while deleting the message:", error);
  }
};

export const subscribeToMessages = () => async (dispatch, getState) => {
  const { selectedContact } = getState().chat;
  const { socket } = getState().auth;
  if (!selectedContact) return;

  socket.on("newMessage", (newMessage) => {
    dispatch(setAddCurrentChatMessage(newMessage));
  });
};

export const unsubscribeFromMessages = () => async (dispatch) => {
  const { socket } = getState().auth;

  socket.off("newMessage");
};

export const {
  setChat,
  setContacts,
  setSelectedContact,
  setIsContactsLoading,
  setIsChatLoading,
  setChatError,
  setContactsError,
  setAddCreatedContact,
  setRemoveDeletedContact,
  setAddCurrentChatMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
