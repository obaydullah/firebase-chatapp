import { configureStore } from "@reduxjs/toolkit";
import activeChatReducer from "../features/activeChat/activeChatSlice";
import groupMemberSlice from "../features/groupMembers/groupMemberSlice";

export const store = configureStore({
  reducer: {
    activeChat: activeChatReducer,
    groupMembers: groupMemberSlice,
  },
});
