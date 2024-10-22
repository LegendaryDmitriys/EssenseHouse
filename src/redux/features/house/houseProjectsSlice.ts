import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface HouseProject {
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
}

const initialState: HouseProjectsState = {
    houseProjects: [],
    categoryInfo: null,
    loading: false,
    error: null,
    selectedProject: null,
};

export const fetchProjectsByCategory = createAsyncThunk(
    'houseProjects/fetchProjectsByCategory',
    async (category: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://192.168.0.103:8000/houses?category=${category}`);
            return response.data;
        } catch (err) {
            return rejectWithValue('Ошибка при загрузке данных проектов.');
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    'houseProjects/fetchProjectById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://192.168.0.103:8000/houses/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue('Ошибка при загрузке данных проекта.');
        }
    }
);


const houseProjectsSlice = createSlice({
    name: 'houseProjects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectsByCategory.fulfilled, (state, action) => {
                state.houseProjects = action.payload;
                state.categoryInfo = action.payload[0]?.category || null;
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
            });
    },
});

export default houseProjectsSlice.reducer;
