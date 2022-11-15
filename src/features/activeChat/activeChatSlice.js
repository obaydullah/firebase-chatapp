import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

// create slice
export const activeChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    activeChat: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default activeChatSlice.reducer;
export const { activeChat } = activeChatSlice.actions;
