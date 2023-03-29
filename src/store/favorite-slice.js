import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addToFavoriteItems(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if( !existingItem ){ state.items.push(newItem); }
        },
        removeFromFavoriteItems(state, action){
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        }
    }
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;