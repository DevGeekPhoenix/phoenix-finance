import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userToken: "",
  refetch: null,
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
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const { setUserData, setUserToken, setRefetch } = dataSlice.actions;

export default dataSlice.reducer;
