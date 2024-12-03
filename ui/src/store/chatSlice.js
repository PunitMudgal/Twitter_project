import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../fetch/axios";

const initialState = {
  chat: [], // messages
  contacts: [], // conversations
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
    setRemoveDeletedMessage: (state, action) => {
      state.chat = state.chat.filter((user) => user._id !== action.payload);
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
    const deleteResponse = axiosInstance.delete(
      `conversation/delete-conversation/${conversationId}`
    );
    toast.promise(deleteResponse, {
      loading: "Deleting Conversation...",
      success: "Deleted",
      error: "Deletion Failed",
    });
    deleteResponse.then((data) => {
      dispatch(setRemoveDeletedContact(data._id));
      dispatch(setSelectedContact(null));
    });
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error in CreateConversations:", error);
  }
};

/** MESSAGE */

export const getMessage = (conversationId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(`/message/${conversationId}`);
    dispatch(setChat(data));
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error in getting messages:", error);
  }
};

export const sendMessage =
  (conversationId, receiverId, text) => async (dispatch) => {
    try {
      const body = { conversationId, receiverId, text };
      const { data } = await axiosInstance.post(`/message`, body);
      dispatch(setAddCurrentChatMessage(data));
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
    const { data } = await axiosInstance.delete(
      `/message/delete-message/${messageId}`
    );
    dispatch(setRemoveDeletedMessage(data._id));
  } catch (error) {
    toast.error(error.response.data.message || error.message);
    console.error("Error while deleting the message:", error);
  }
};

export const subscribeToMessages = () => async (dispatch, getState) => {
  const { selectedContact } = getState().chat;
  const { socket } = getState().auth;

  if (!selectedContact || !socket) return;

  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    dispatch(setAddCurrentChatMessage(newMessage));
  });
};

export const unsubscribeFromMessages = () => async (dispatch, getState) => {
  const { socket } = getState().auth;
  if (!socket) {
    console.warn("Socket is undefined or null during unsubscribe.");
    return;
  }

  console.log("Unsubscribing from newMessage event.");
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
  setRemoveDeletedMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
