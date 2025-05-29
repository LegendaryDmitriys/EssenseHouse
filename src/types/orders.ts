import {FinishingOption} from "@/types/house.ts";

export type OrderStatus = 'pending' | 'approved' | 'rejected';

export interface Order {
    id: number;
    house: number;
    name: string;
    phone: string;
    email?: string;
    house_details: {
        id: number;
        title: string;
    };

    finishing_option?: FinishingOption
    finishing_option_details?: FinishingOption
    construction_place: string;
    message: string;
    data_created: string;
    status: OrderStatus;
    latitude?: number;
    longitude?: number;
}