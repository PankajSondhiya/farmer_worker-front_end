import { configureStore } from "@reduxjs/toolkit";
import { configure } from "@testing-library/dom";
import auth from "../Slices/auth.slice";
import farmer from "../Slices/farmer.slice";
import worker from "../Slices/worker.slice";
import admin from "../Slices/admin.slice";

export const store = configureStore({
  reducer: {
    auth,
    farmer,
    worker,
    admin,
  },
});
