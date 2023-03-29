import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    sortedItems: [],
    item: null,
    allItems: false,
    movieTitleFilter: "",
    filterByYearType: "",
    orderByYear: "",
    yearRange: [],
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        replaceItems(state, action) {
            state.items = action.payload.items;
        },
        replaceSortedItems(state, action) {
            state.sortedItems = action.payload.items;
        },
        loadAllItems(state, action){
            state.allItems = action.payload.allItems;
        },
        updateMovieTitleFilter(state, action){
            state.movieTitleFilter = action.payload
        },
        updateFilterByYearType(state, action){
            state.filterByYearType = action.payload.filterByYearType
        },
        updateOrderByYear(state, action){
            state.orderByYear = action.payload
        },
        updateYearRange(state, action){
            state.yearRange = action.payload
        },
        updateItem(state, action){
            state.item = action.payload.item
        }
    }
});

export const movieActions = movieSlice.actions;

export default movieSlice;