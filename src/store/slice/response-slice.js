import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: true,
  theme: "light",
};

const responsiveSlice = createSlice({
    name: "responsive",
    initialState,
    reducers: {
        setSidebarShow(state, action) {
            state.sidebarShow = action.payload;
        },
        setTheme(state, action) {
            state.theme = action.payload;
        },
        setSidebarUnfoldable(state, action) {
            state.sidebarUnfoldable = action.payload;
        }
    },
})

export default responsiveSlice;
