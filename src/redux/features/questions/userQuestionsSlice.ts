import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../api/api.ts";


export const updateUserQuestionStatus = createAsyncThunk(
    "userQuestions/updateUserQuestionStatus",
    async ({ id, status }: { id: number; status: string }) => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(
            `${config.API_URL}user-question/${id}/`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }
);

export const fetchUserQuestions = createAsyncThunk(
    "userQuestions/fetchUserQuestions",
    async () => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${config.API_URL}user-questions/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

export const fetchUserQuestionById = createAsyncThunk(
    "userQuestions/fetchUserQuestionById",
    async (id: number) => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${config.API_URL}user-question/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
);

type UserQuestion = {
    id: number;
    name: string;
    phone: string;
    created_at: string;
    status: string;
};

type UserQuestionsState = {
    questions: UserQuestion[];
    selectedQuestion: UserQuestion | null;
    loading: boolean;
    error: string | null;
};

const initialState: UserQuestionsState = {
    questions: [],
    selectedQuestion: null,
    loading: false,
    error: null,
};

const userQuestionsSlice = createSlice({
    name: "userQuestions",
    initialState,
    reducers: {
        setUserQuestions: (state, action: PayloadAction<UserQuestion[]>) => {
            state.questions = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserQuestions.fulfilled, (state, action: PayloadAction<UserQuestion[]>) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(fetchUserQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось загрузить вопросы";
            })

            .addCase(fetchUserQuestionById.pending, (state) => {
                state.loading = true;
                state.selectedQuestion = null;
                state.error = null;
            })
            .addCase(fetchUserQuestionById.fulfilled, (state, action: PayloadAction<UserQuestion>) => {
                state.loading = false;
                state.selectedQuestion = action.payload;
            })
            .addCase(fetchUserQuestionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось загрузить вопрос";
            })

            .addCase(updateUserQuestionStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserQuestionStatus.fulfilled, (state, action: PayloadAction<UserQuestion>) => {
                state.loading = false;
                const updatedQuestion = action.payload;
                const index = state.questions.findIndex(q => q.id === updatedQuestion.id);
                if (index !== -1) {
                    state.questions[index] = updatedQuestion;
                }
            })
            .addCase(updateUserQuestionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось обновить статус";
            });
    },
});

export const { setUserQuestions } = userQuestionsSlice.actions;
export default userQuestionsSlice.reducer;
