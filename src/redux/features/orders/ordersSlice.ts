import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../api/api.ts";


export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${config.API_URL}orders/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || "Ошибка при загрузке заказов");
    }
});

export const updateOrderStatus = createAsyncThunk(
    "orders/updateOrderStatus",
    async ({ id, status }: { id: number; status: string }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(
                `${config.API_URL}order/${id}/`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Ошибка при обновлении статуса заказа");
        }
    }
);

export const fetchPurchasedHouses = createAsyncThunk(
    "orders/fetchPurchasedHouses",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${config.API_URL}houses/purchase/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Ошибка при загрузке домов");
        }
    }
);

export const updatePurchasedHouseStatus = createAsyncThunk(
    "orders/updatePurchasedHouseStatus",
    async ({ id, construction_status }: { id: number; construction_status: string }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(
                `${config.API_URL}houses/purchase/${id}/`,
                { construction_status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Ошибка при обновлении статуса");
        }
    }
);

type House = {
    id: number;
    title: string;
}

type HouseDetails = {
    id: number;
    title: string;
};

type finishingOption = {
    id: number;
    title: string;
}

export type Order = {
    id: number;
    name: string;
    phone: string;
    email: string;
    house: House;
    house_details: HouseDetails;
    finishing_option: finishingOption;
    construction_place: string;
    message: string;
    data_created: string;
    status: string;
    latitude: number | null;
    longitude: number | null;
};

type PurchasedHouse = {
    id: number;
    house: House;
    purchase_date: string;
    buyer_name: string;
    buyer_phone: string;
    buyer_email: string;
    construction_status: string;
    latitude: number | null;
    longitude: number | null;
};

type OrdersState = {
    orders: Order[];
    purchasedHouses: PurchasedHouse[];
    loading: boolean;
    error: string | null;
};

const initialState: OrdersState = {
    orders: [],
    purchasedHouses: [],
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось загрузить заказы";
            })
            .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
                const index = state.orders.findIndex(order => order.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index].status = action.payload.status;
                }
            })
            .addCase(fetchPurchasedHouses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPurchasedHouses.fulfilled, (state, action: PayloadAction<PurchasedHouse[]>) => {
                state.loading = false;
                state.purchasedHouses = action.payload;
            })
            .addCase(fetchPurchasedHouses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Не удалось загрузить купленные дома";
            })
            .addCase(updatePurchasedHouseStatus.fulfilled, (state, action: PayloadAction<PurchasedHouse>) => {
                const index = state.purchasedHouses.findIndex(ph => ph.id === action.payload.id);
                if (index !== -1) {
                    state.purchasedHouses[index].construction_status = action.payload.construction_status;
                }
            });
    },
});

export default ordersSlice.reducer;
