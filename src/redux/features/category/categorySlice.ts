import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
    id: number;
    name: string;
    slug: string;
    long_description: string;
    short_description: string;
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

export const addCategory = createAsyncThunk<Category, Omit<Category, 'id'>>(
    'categories/addCategory',
    async (categoryData) => {
        const response = await axios.post('http://192.168.0.103:8000/category/', categoryData);
        return response.data;
    }
);

export const updateCategory = createAsyncThunk<Category, Category>(
    'categories/updateCategory',
    async (category) => {
        const response = await axios.put(`http://192.168.0.103:8000/category/${category.id}/`, category);
        return response.data;
    }
);

export const deleteCategory = createAsyncThunk<number, number>(
    'categories/deleteCategory',
    async (id) => {
        await axios.delete(`http://192.168.0.103:8000/category/${id}/`);
        return id;
    }
);

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
            })
            .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.items.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.items.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(category => category.id !== action.payload);
            });
    },
});

export default categorySlice.reducer;
