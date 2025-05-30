import {House} from "@/types/house.ts";

export type ConstructionStatus = 'not_started' | 'in_progress' | 'completed';

export interface PurchasedHouse {
    id: number;
    house: House;
    house_id : number;
    purchase_date: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    construction_status: ConstructionStatus;
    latitude?: number;
    longitude?: number;
    address?: string;
    completed_date?: string;
}