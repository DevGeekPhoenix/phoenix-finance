import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userToken: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { setUserData, setUserToken } = dataSlice.actions;

export default dataSlice.reducer;
