import { configureStore } from "@reduxjs/toolkit";
import formReducer from './Slices/formslice';

export const store = configureStore({
    reducer: {
        form: formReducer,
    }
})