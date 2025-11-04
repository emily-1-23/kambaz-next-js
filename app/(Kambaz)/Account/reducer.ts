import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

const initialState = {
  currentUser: db.users[0],
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;