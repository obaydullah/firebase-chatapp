import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
};

// create slice
export const groupMemberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    groupmembers: (state, action) => {
      state.members.push(action.payload);
    },
  },
});

export default groupMemberSlice.reducer;
export const { groupmembers } = groupMemberSlice.actions;
