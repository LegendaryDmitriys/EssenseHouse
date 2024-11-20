import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../../api/api.ts";

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
    const response = await axios.get(`${config.API_URL}category/`);
    return response.data;
});

export const addCategory = createAsyncThunk<Category, Omit<Category, 'id'>>(
    "categories/addCategory",
    async (categoryData) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.post(
            `${config.API_URL}category/`,
            categoryData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
);

export const updateCategory = createAsyncThunk<Category, Category>(
    "categories/updateCategory",
    async (category) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.put(
            `${config.API_URL}category/${category.id}/`,
            category,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
);


export const deleteCategory = createAsyncThunk<number, number>(
    "categories/deleteCategory",
    async (id) => {
        const token = localStorage.getItem("accessToken");

        await axios.delete(`${config.API_URL}category/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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
