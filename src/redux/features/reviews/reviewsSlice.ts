import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from "../../../api/api.ts";


interface Review {
    id: number;
    name: string;
    review: string;
    date: string;
    rating: number;
    file: string;
    file_name: string;
    file_size: number;
    status: "published" | "rejected";
}


interface ReviewsState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}


const initialState: ReviewsState = {
    reviews: [],
    loading: true,
    error: null,
};


export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (status: "published" | "rejected"| "pending" | null = null) => {
        const url = status ? `${config.API_URL}reviews/?status=${status}` : `${config.API_URL}reviews/`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка при получении отзывов');
        }
        return (await response.json()) as Review[];
    }
);


export const addReview = createAsyncThunk(
    'reviews/addReview',
    async (reviewData: FormData) => {
        const response = await fetch(`${config.API_URL}reviews/`, {
            method: 'POST',
            body: reviewData,
        });
        if (!response.ok) {
            throw new Error('Ошибка при добавлении отзыва');
        }
        return (await response.json()) as Review;
    }
);


export const updateReviewStatus = createAsyncThunk(
    'reviews/updateReviewStatus',
    async ({ id, status }: { id: number; status: "published" | "rejected" | "pending" }) => {
        const response = await fetch(`${config.API_URL}reviews/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) {
            throw new Error('Ошибка при обновлении статуса отзыва');
        }
        return await response.json() as Review;
    }
);




const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка';
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(updateReviewStatus.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(review => review.id === action.payload.id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            });
    },
});

export default reviewsSlice.reducer;
