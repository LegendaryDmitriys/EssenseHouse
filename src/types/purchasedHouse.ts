import {House} from "@/types/house.ts";

export type ConstructionStatus = 'not_started' | 'in_progress' | 'completed';

export interface PurchasedHouse {
    id: number;
    house: House;
    house_id : number;
    purchase_date: string;
    buyer_name: string;
    buyer_phone: string;
    buyer_email: string;
    construction_status: ConstructionStatus;
    latitude?: number;
    longitude?: number;
    address?: string;
    completed_date?: string;
}