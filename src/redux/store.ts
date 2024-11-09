import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../redux/features/category/categorySlice.ts';
import houseProjectsReducer from '../redux/features/house/houseProjectsSlice.ts';
import filtersReducer from '../redux/features/filter/filterSlice.ts';
import reviewsReducer from '../redux/features/reviews/reviewsSlice.ts'
import orderReducer from '../redux/features/orders/ordersSlice.ts'
import questionHouseReducer from './features/questions/userQuestionsHouseSlice.ts'
import questionReducer from '../redux/features/questions/userQuestionsSlice.ts'
import finishingOptionsReducer from  '../redux/features/finishingOption/finishingOptionSlice.ts'

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        houseProjects: houseProjectsReducer,
        filters: filtersReducer,
        reviews: reviewsReducer,
        orders: orderReducer,
        questionsHouse: questionHouseReducer,
        question: questionReducer,
        finishingOptions: finishingOptionsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
