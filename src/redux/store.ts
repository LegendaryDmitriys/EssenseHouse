import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../redux/features/category/categorySlice.ts';
import houseProjectsReducer from '../redux/features/house/houseProjectsSlice.ts';
import filtersReducer from '../redux/features/filter/filterSlice.ts';
import reviewsReducer from '../redux/features/reviews/reviewsSlice.ts'
import orderReducer from '../redux/features/orders/ordersSlice.ts'

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        houseProjects: houseProjectsReducer,
        filters: filtersReducer,
        reviews: reviewsReducer,
        orders: orderReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
