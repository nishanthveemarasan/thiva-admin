import { createSlice } from "@reduxjs/toolkit"
import { IconRefresh } from "ckeditor5";

const initialState = {
    services: [],
    selectedService: null,
    IconRefresh 
}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        updateRefresh: (state) => {
            state.refresh = !state.refresh;
        },
        setServices: (state, action) => {
            state.services = action.payload;
            state.selectedService = null;
        },
        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        removeService: (state, action) => {
            state.services = state.services.filter((service, index) => index !== action.payload);
        },
        updateService: (state, action) => {
            const { index, service } = action.payload;
            if (index >= 0 && index < state.services.length) {
                state.services[index] = service;
            }
        }
    }
});

export default serviceSlice;