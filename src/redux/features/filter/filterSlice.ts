import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../../api/api.ts";

export interface FilterOption {
    id: number;
    name: string;
    field_name: string;
    filter_type: 'exact' | 'range' | 'contains';
    options?: { [key: string]: any };
}

interface FiltersState {
    filterOptions: FilterOption[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const fetchFilters = createAsyncThunk<FilterOption[], void>(
    'filters/fetchFilters',
    async () => {
        const response = await axios.get<FilterOption[]>(`${config.API_URL}/filter-options/`);
        return response.data;
    }
);

export const fetchFilterOptions = createAsyncThunk<FilterOption[]>(
    'filterOptions/fetchFilterOptions',
    async () => {
        const response = await axios.get(`${config.API_URL}filter-options/`);
        return response.data;
    }
);


export const addFilterOption = createAsyncThunk<FilterOption, FilterOption>(
    "filterOptions/addFilterOption",
    async (newOption) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.post(
            `${config.API_URL}filter-options/`,
            newOption,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
);

export const updateFilterOption = createAsyncThunk<FilterOption, FilterOption>(
    "filterOptions/updateFilterOption",
    async (updatedOption) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.put(
            `${config.API_URL}filter-options/${updatedOption.id}/`,
            updatedOption,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
);


export const deleteFilterOption = createAsyncThunk<number, number>(
    "filterOptions/deleteFilterOption",
    async (id) => {
        const token = localStorage.getItem("accessToken");


        await axios.delete(`${config.API_URL}filter-options/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return id;
    }
);

const initialState: FiltersState = {
    filterOptions: [],
    status: 'idle',
    error: null,
};


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
            })
            .addCase(fetchFilterOptions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action: PayloadAction<FilterOption[]>) => {
                state.status = 'succeeded';
                state.filterOptions = action.payload;
            })
            .addCase(fetchFilterOptions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Ошибка загрузки фильтров';
            })
            .addCase(addFilterOption.fulfilled, (state, action: PayloadAction<FilterOption>) => {
                state.filterOptions.push(action.payload);
            })
            .addCase(updateFilterOption.fulfilled, (state, action: PayloadAction<FilterOption>) => {
                const index = state.filterOptions.findIndex(option => option.id === action.payload.id);
                if (index !== -1) {
                    state.filterOptions[index] = action.payload;
                }
            })
            .addCase(deleteFilterOption.fulfilled, (state, action: PayloadAction<number>) => {
                state.filterOptions = state.filterOptions.filter(option => option.id !== action.payload);
            });
    },
});
export default filterSlice.reducer;
