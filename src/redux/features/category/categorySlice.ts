import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface Category {
    id: number;
    name: string;
    slug: string;
}


interface CategoryState {
    items: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetchCategories', async () => {
    const response = await axios.get('http://192.168.0.103:8000/category/');
    return response.data;
});

const initialState: CategoryState = {
    items: [],
    status: 'idle',
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load categories';
            });
    },
});

export default categorySlice.reducer;
