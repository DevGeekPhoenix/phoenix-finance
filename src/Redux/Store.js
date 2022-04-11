import dataReaducer from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    data: dataReaducer,
  },
  middleware: [logger],
});
