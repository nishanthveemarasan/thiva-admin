import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    msg:{
        content:"",
        success: false,
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        loginResponse(state, action) {
            const {name, type, content, success} = action.payload;
            state.name = name;
            state.msg = {
                type,
                content
            }
        },
        logout(state){
            state.name = "";
            state.msg = {
                content: "Logout Successfull!!",
                success: true,
            }
        }
    }
})

export default authSlice;