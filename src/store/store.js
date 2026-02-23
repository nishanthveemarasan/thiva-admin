import { configureStore } from "@reduxjs/toolkit";
import responsiveSlice from "./slice/response-slice";
import authSlice from "./slice/auth-slice";
import experienceSlice from "./slice/experice-slice";
import serviceSlice from "./slice/service-slice";

const store = configureStore({
    reducer:{
        responsiveStore: responsiveSlice.reducer,
        authStore: authSlice.reducer,
        experienceStore: experienceSlice.reducer,
        serviceStore: serviceSlice.reducer
    }

})

export const responsiveStoreActions = responsiveSlice.actions;
export const authStoreActions = authSlice.actions;
export const experienceStoreActions = experienceSlice.actions;
export const serviceStoreActions = serviceSlice.actions;
export default store;