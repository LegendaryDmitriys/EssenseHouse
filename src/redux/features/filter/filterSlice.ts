import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../../api/api.ts";

export interface FilterOption {
    id: number;
    name: string;
    field_name: string;
    filter_type: 'exact' | 'range' | 'contains';
    options?: {
        min?: number;
        max?: number;
        default?: number;
        choices?: number[];
    };
}

interface FiltersState {
    filterOptions: FilterOption[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: FiltersState = {
    filterOptions: [],
    status: 'idle',
    error: null,
};

export const fetchFilters = createAsyncThunk<FilterOption[], void>(
    'filters/fetchFilters',
    async () => {
        const response = await axios.get<FilterOption[]>(`${config.API_URL}/filter-options/`);
        return response.data;
    }
);

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action: PayloadAction<FilterOption[]>) => {
                state.status = 'succeeded';
                state.filterOptions = action.payload;
            })
            .addCase(fetchFilters.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load filters';
            });
    },
});
export default filterSlice.reducer;
