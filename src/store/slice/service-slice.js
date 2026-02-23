import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    services: [],
}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
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