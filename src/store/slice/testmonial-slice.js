import { createSlice } from "@reduxjs/toolkit"
import { IconRefresh } from "ckeditor5";

const initialState = {
    testimonials: [],
    selectedTestimonial: null,
    IconRefresh 
}

const testimonialSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        updateRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        setTestimonials: (state, action) => {
            state.testimonials = action.payload;
        },
        setSelectedTestimonial: (state, action) => {
            state.selectedTestimonial = action.payload;
        }
    }
});

export default testimonialSlice;