import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
  value: boolean;
  trackId: string;
}

const initialState: DrawerState = {
  value: false,
  trackId: "",
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    istrue: (state) => {
      state.value = true;
    },
    isFalse: (state) => {
      state.value = false;
    },
    isTrackId: (state, action: any) => {
      state.trackId = action.payload;
    },
  },
});

export const { istrue, isFalse, isTrackId } = drawerSlice.actions;

export default drawerSlice.reducer;
