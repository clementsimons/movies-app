import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "./favorite-slice";
import movieSlice from "./movie-slice";
import uiSlice from "./ui-slice";

import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favorite']
  }

const rootReducer = combineReducers({
    ui: uiSlice.reducer,
    movie: movieSlice.reducer,
    favorite: favoriteSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);