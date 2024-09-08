import { configureStore } from "@reduxjs/toolkit";
import drawerSlice from "../Slices/drawerSlice";

export const store = configureStore({
  reducer: { drawerSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
