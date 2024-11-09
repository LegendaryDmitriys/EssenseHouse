import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../../api/api.ts";


interface FinishingOption {
    id: number;
    title: string;
    description: string;
    price_per_sqm: number;
    image: string | null;
}


interface FinishingOptionState {
    items: FinishingOption[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const fetchFinishingOptions = createAsyncThunk<FinishingOption[]>(
    'finishingOptions/fetchFinishingOptions',
    async () => {
        const response = await axios.get(`${config.API_URL}finishing-options/`);
        return response.data;
    }
);

export const addFinishingOption = createAsyncThunk(
    'finishingOptions/addFinishingOption',
    async (data: { title: string, description: string, price_per_sqm: number, image: File | null }) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price_per_sqm", data.price_per_sqm.toString());

        if (data.image) {
            formData.append("image", data.image);
        }

        const response = await fetch(`${config.API_URL}finishing-options/`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Ошибка при добавлении варианта отделки');
        }

        return await response.json();
    }
);

export const updateFinishingOption = createAsyncThunk<FinishingOption, FormData>(
    'finishingOptions/updateFinishingOption',
    async (formData) => {
        const response = await axios.put(`${config.API_URL}finishing-options/${formData.get('id')}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
);


export const deleteFinishingOption = createAsyncThunk<number, number>(
    'finishingOptions/deleteFinishingOption',
    async (id) => {
        await axios.delete(`${config.API_URL}finishing-options/${id}/`);
        return id;
    }
);


const initialState: FinishingOptionState = {
    items: [],
    status: 'idle',
    error: null,
};


const finishingOptionSlice = createSlice({
    name: 'finishingOptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFinishingOptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFinishingOptions.fulfilled, (state, action: PayloadAction<FinishingOption[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchFinishingOptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load finishing options';
            })
            .addCase(addFinishingOption.fulfilled, (state, action: PayloadAction<FinishingOption>) => {
                state.items.push(action.payload);
            })
            .addCase(updateFinishingOption.fulfilled, (state, action: PayloadAction<FinishingOption>) => {
                const index = state.items.findIndex(option => option.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteFinishingOption.fulfilled, (state, action: PayloadAction<number>) => {
                state.items = state.items.filter(option => option.id !== action.payload);
            });
    },
});

export default finishingOptionSlice.reducer;
