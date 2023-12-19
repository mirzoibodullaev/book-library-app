import { configureStore } from "@reduxjs/toolkit";
import { booksReducer } from "../slices/booksSlice";
import { filterReducer } from "../slices/filterSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
        filter: filterReducer,
    },
});
