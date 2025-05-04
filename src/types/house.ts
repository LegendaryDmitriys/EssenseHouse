import {PaginatedResponse} from "@/types/paginated.ts";

export interface HouseCategory {
    id: number
    name: string
    short_description?: string
    long_description?: string
    slug: string
}

export interface ConstructionTechnology {
    id: number
    name: string
}

export interface Image {
    id: number
    image: string
}

export interface Document {
    id: number
    file: string
    title: string
    size: number
}

export interface FinishingOption {
    id: number
    title: string
    description?: string
    image?: string
    price_per_sqm: number
}

export interface House {
    id: number
    title: string
    price: string
    discount_percentage: string
    new: boolean
    best_seller?: string
    area: string
    floors: number
    rooms: number
    living_area: string
    kitchen_area: string
    bedrooms: number
    bathrooms: number
    garage?: number
    purpose: string
    warranty?: number
    construction_time?: number
    construction_technology_details: ConstructionTechnology
    category_details: HouseCategory
    description?: string
    images: Image[]
    interior_images: Image[]
    facade_images: Image[]
    layout_images: Image[]
    documents: Document[]
    finishing_options_details: FinishingOption[]
    new_price?: number
    discount?: number
}


export interface HouseResponse {
    id: number;
    house_id: number;
    buyer_email: string;
    buyer_name: string;
    buyer_phone: string;
    construction_status: string;
    purchase_date: string;
    latitude: string;
    longitude: string;
    house: {
        id: number;
        title: string;
        address: string;
        area: number;
        year: number;
        images: Array<{url: string}>;
    };
}


export interface PurchasedHouse {
    id : number;
    address: string;
    completed_date: string;
    latitude: number;
    longitude: number;
    house: {
        id: number;
        title: string;
        images: Image[];
        area: number;
    };
}



export interface HouseFormValues {
    title: string;
    price: string;
    discount_percentage?: string;
    new: boolean;
    best_seller?: string;
    area: string;
    floors: string;
    rooms: string;
    living_area: string;
    kitchen_area?: string;
    bedrooms: string;
    bathrooms?: string;
    garage?: string;
    purpose: string;
    warranty?: string;
    construction_time?: string;
    construction_technology: string;
    finishing_options: string[];
    category: string;
    description?: string;
}

export type PreviewItem = Image | Document;

export type PaginatedHouses = PaginatedResponse<House>;