import {PaginatedResponse} from "@/types/paginated.ts";
import {House} from "@/types/house.ts";

export type BlogStatus = 'rejected' | 'pending' | 'published';

export interface Blog {
    id: number;
    title: string;
    description: string;
    content: string;
    date: string;
    image: File | null;
    category_id: number;
    category: {
        id: number;
        name: string;
    }
    status: string;
}


export interface BlogPost {
    id: string;
    title: string;
    description: string;
    date: string;
    image: string;
    content: string;
    category: {
        name: string;
    };
}

export type PaginatedBlogs = PaginatedResponse<Blog>;