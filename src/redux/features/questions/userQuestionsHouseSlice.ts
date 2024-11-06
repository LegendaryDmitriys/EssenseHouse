import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../api/api.ts";


export const fetchUserQuestionsHouse = createAsyncThunk(
    "userQuestions/fetchUserQuestionsHouse",
    async () => {
        const response = await axios.get(`${config.API_URL}user-questions/house/`);
        return response.data;
    }
);

export const fetchUserQuestionHouseById = createAsyncThunk(
    "userQuestions/fetchUserQuestionHouseById",
    async (id: number) => {
        const response = await axios.get(`${config.API_URL}user-questions/house/${id}/`);
        return response.data;
    }
);

type UserQuestionHouse = {
    id: number;
    name: string;
    phone: string;
    email: string;
    house: number;
    question: string;
    created_at: string;
    status: string;
};


type UserQuestionsHouseState = {
    questions: UserQuestionHouse[];
    selectedQuestion: UserQuestionHouse | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserQuestionsHouseState = {
    questions: [],
    selectedQuestion: null,
    loading: false,
    error: null,
};


const userQuestionsHouseSlice = createSlice({
    name: "userQuestions",
    initialState,
    reducers: {
        setUserQuestionsHouse: (state, action: PayloadAction<UserQuestionHouse[]>) => {
            state.questions = action.payload;
        },
        updateUserQuestionHouseStatus: (state, action: PayloadAction<{ id: number, status: string }>) => {
            const { id, status } = action.payload;
            const question = state.questions.find(q => q.id === id);
            if (question) {
                question.status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserQuestionsHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserQuestionsHouse.fulfilled, (state, action: PayloadAction<UserQuestionHouse[]>) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchUserQuestionsHouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось загрузить вопросы пользователей";
            })

            .addCase(fetchUserQuestionHouseById.pending, (state) => {
                state.loading = true;
                state.selectedQuestion = null;
                state.error = null;
            })
            .addCase(fetchUserQuestionHouseById.fulfilled, (state, action: PayloadAction<UserQuestionHouse>) => {
                state.loading = false;
                state.selectedQuestion = action.payload;
            })
            .addCase(fetchUserQuestionHouseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось загрузить вопрос";
            });
    },
});

export const { setUserQuestionsHouse, updateUserQuestionHouseStatus } = userQuestionsHouseSlice.actions;
export default userQuestionsHouseSlice.reducer;
