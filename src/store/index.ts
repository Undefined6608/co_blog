// src/store.ts

import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./modules/counter";
import { userReducer } from "./modules/user";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export default store;
