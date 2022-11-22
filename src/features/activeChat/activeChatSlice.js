import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
  status: "",
  group: {},
};

// create slice
export const activeChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    activeChat: (state, action) => {
      state.value = action.payload;
      state.status = "single";
      state.group = {};
    },
    activeChatGroup: (state, action) => {
      state.value = {};
      state.group = action.payload;
      state.status = "group";
    },
  },
});

export default activeChatSlice.reducer;
export const { activeChat, activeChatGroup } = activeChatSlice.actions;
