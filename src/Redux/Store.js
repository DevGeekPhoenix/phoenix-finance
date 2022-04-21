import dataReaducer from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    data: dataReaducer,
  },
});
