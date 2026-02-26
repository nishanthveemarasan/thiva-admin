import { configureStore } from "@reduxjs/toolkit";
import responsiveSlice from "./slice/response-slice";
import authSlice from "./slice/auth-slice";
import experienceSlice from "./slice/experice-slice";
import serviceSlice from "./slice/service-slice";
import projectSlice from "./slice/project-slice";
import testimonialSlice from "./slice/testmonial-slice";
import homeSlice from "./slice/home-slice";

const store = configureStore({
    reducer:{
        responsiveStore: responsiveSlice.reducer,
        authStore: authSlice.reducer,
        experienceStore: experienceSlice.reducer,
        serviceStore: serviceSlice.reducer,
        projectStore: projectSlice.reducer,
        testimonialStore: testimonialSlice.reducer,
        homeStore: homeSlice.reducer
    }

})

export const responsiveStoreActions = responsiveSlice.actions;
export const authStoreActions = authSlice.actions;
export const experienceStoreActions = experienceSlice.actions;
export const serviceStoreActions = serviceSlice.actions;
export const projectStoreActions = projectSlice.actions;
export const testimonialStoreActions = testimonialSlice.actions;
export const homeStoreActions = homeSlice.actions;
export default store;