import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../../api/api.ts";

export interface HouseProject {
    id: number;
    title: string;
    images: { id: number; image: string }[];
    layout_images: { id : number; image: string }[];
    interior_images: { id : number; image: string }[];
    facade_images: { id : number; image: string }[];
    finishing_options: { id : number; image: string; title: string; description: string; price_per_sqm: number }[];
    documents: { id : number; image: string; title: string; size: string; file: string}[];
    price?: number;
    old_price?: number;
    discount?: number;
    best_seller?: string;
    new?: boolean;
    short_description?: string;
    area?: number;
    floors?: number;
    rooms?: number;
    living_area?: number;
    kitchen_area?: number;
    bedrooms?: number;
    garage?: boolean;
    garage_capacity?: number;
    purpose: string;
    bathrooms?: number;
    construction_time?: number;
    warranty?: number;
    description?: string;
    category: Category;

}

interface Category {
    id: number;
    name: string;
    slug: string;
    short_description: string;
    long_description: string;
}

interface HouseProjectsState {
    houseProjects: HouseProject[];
    categoryInfo: Category | null;
    loading: boolean;
    error: string | null;
    selectedProject: HouseProject | null;
    selectedFilters: Record<string, null>;
}

const initialState: HouseProjectsState = {
    houseProjects: [],
    categoryInfo: null,
    loading: false,
    error: null,
    selectedProject: null,
    selectedFilters: {},
};


export const addHouse = createAsyncThunk(
    'houseProjects/addHouse',
    async (newHouse: HouseProject, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${config.API_URL}houses/`, newHouse);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка при добавлении проекта.');
        }
    }
);


export const deleteHouse = createAsyncThunk(
    'houseProjects/deleteHouse',
    async (id: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${config.API_URL}houses/${id}/`);
            return id;
        } catch {
            return rejectWithValue('Ошибка при удалении проекта.');
        }
    }
);


export const fetchHouses = createAsyncThunk(
    'houseProjects/fetchHouses',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${config.API_URL}houses/`);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка при загрузке проектов.');
        }
    }
);


export const updateHouse = createAsyncThunk(
    'houseProjects/updateHouse',
    async (updatedHouse: HouseProject, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${config.API_URL}houses/${updatedHouse.id}/`, updatedHouse);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка при обновлении проекта.');
        }
    }
);


export const fetchCategoryInfo = createAsyncThunk(
    'houseProjects/fetchCategoryInfo',
    async (categorySlug: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${config.API_URL}categories/${categorySlug}`);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка при загрузке информации о категории.');
        }
    }
);


export const fetchProjectsByCategory = createAsyncThunk(
    'houseProjects/fetchProjectsByCategory',
    async ({ category, filters }: { category: string; filters: Record<string, null> }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({ category });
            addFiltersToParams(filters, params);

            const response = await axios.get(`${config.API_URL}houses?${params.toString()}`);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка при загрузке данных проектов.');
        }
    }
);

const addFiltersToParams = (filters: Record<string, null>, params: URLSearchParams) => {
    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            params.append(key, value);
        }
    })
};

export const fetchProjectById = createAsyncThunk(
    'houseProjects/fetchProjectById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${config.API_URL}houses/${id}`);
            return response.data;
        } catch {
            return rejectWithValue('Ошибка при загрузке данных проекта.');
        }
    }
);


const houseProjectsSlice = createSlice({
    name: 'houseProjects',
    initialState,
    reducers: {
        setSelectedFilters: (state, action) => {
            state.selectedFilters = action.payload;
        },
        clearSelectedFilters: (state) => {
            state.selectedFilters = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoryInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryInfo.fulfilled, (state, action) => {
                state.categoryInfo = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategoryInfo.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchProjectsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectsByCategory.fulfilled, (state, action) => {
                state.houseProjects = action.payload;
                if (action.payload.length > 0) {
                    state.categoryInfo = action.payload[0].category;
                }
                state.loading = false;
            })
            .addCase(fetchProjectsByCategory.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })

            .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.selectedProject = action.payload;
                state.loading = false;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addHouse.fulfilled, (state, action) => {
                state.houseProjects.push(action.payload);
                state.loading = false;
            })
            .addCase(addHouse.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(deleteHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteHouse.fulfilled, (state, action) => {
                state.houseProjects = state.houseProjects.filter((project) => project.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteHouse.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(fetchHouses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHouses.fulfilled, (state, action) => {
                state.houseProjects = action.payload;
                state.loading = false;
            })
            .addCase(fetchHouses.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateHouse.fulfilled, (state, action) => {
                const index = state.houseProjects.findIndex((project) => project.id === action.payload.id);
                if (index !== -1) {
                    state.houseProjects[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateHouse.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export const { setSelectedFilters, clearSelectedFilters } = houseProjectsSlice.actions;

export default houseProjectsSlice.reducer;
