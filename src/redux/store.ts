import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../redux/features/category/categorySlice.ts';
import houseProjectsReducer from '../redux/features/house/houseProjectsSlice.ts';


export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        houseProjects: houseProjectsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
