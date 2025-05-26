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
    image: string;
    status: "published" | "pending" | "rejected";
    files: ReviewFile[];
}


export interface FetchReviewsResponse {
    results: Review[]
    count: number
    next: string | null
    previous: string | null
}


export type ReviewPaginatedResponse = PaginatedResponse<Review>;