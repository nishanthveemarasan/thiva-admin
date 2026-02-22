import { configureStore } from "@reduxjs/toolkit";
import responsiveSlice from "./slice/response-slice";
import authSlice from "./slice/auth-slice";

const store = configureStore({
    reducer:{
        responsiveStore: responsiveSlice.reducer,
        authStore: authSlice.reducer,
    }

})

export const responsiveStoreActions = responsiveSlice.actions;
export const authStoreActions = authSlice.actions;
export default store;