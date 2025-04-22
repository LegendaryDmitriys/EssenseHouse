import {PaginatedResponse} from "@/types/paginated.ts";

export interface ReviewFile {
    id: number;
    file: string;
    file_name: string;
    file_size: number;
    file_type: string;
}

export interface Review {
    id: number;
    name: string;
    review: string;
    date: string;
    rating: number;
    status: "published" | "pending" | "rejected";
    files: ReviewFile[];
}


export type ReviewPaginatedResponse = PaginatedResponse<Review>;