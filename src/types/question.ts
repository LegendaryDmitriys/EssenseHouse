
export type QuestionStatus = 'waiting' | 'answered' | 'closed';

export interface HouseQuestion {
    id: string;
    name: string;
    phone: string;
    email?: string;
    house: number;
    house_details: {
        id: string;
        title: string;
    };
    question: string;
    created_at: string;
    status: QuestionStatus;
    answer?: string;
}

export interface UserQuestion {
    id: string;
    name: string;
    phone: string;
    created_at: string;
    status: QuestionStatus;
    answer?: string;
}
