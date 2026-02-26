import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    content: null,
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setContent: (state, action) => {
            state.content = action.payload;
        }
    }
});

export default homeSlice;