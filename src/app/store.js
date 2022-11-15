import { configureStore } from "@reduxjs/toolkit";
import activeChatReducer from "../features/activeChat/activeChatSlice";

export const store = configureStore({
  reducer: {
    activeChat: activeChatReducer,
  },
});
