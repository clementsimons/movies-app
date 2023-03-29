import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: null };

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showError(state, action) {
            state.error = {
                message: action.payload.message
            };
        },
        resetError(state){
            state.error = null;
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;