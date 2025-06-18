
export type QuestionStatus = 'waiting' | 'answered' | 'closed';

export interface HouseQuestion {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
    house: number;
    house_details?: {
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
    first_name: string;
    last_name: string;
    phone: string;
    created_at: string;
    status: QuestionStatus;
    answer?: string;
}


export interface SimpleQuestion {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    created_at: string;
    status: 'waiting' | 'closed' | 'answered';
}


export interface QuestionsResponse {
    simple_questions: SimpleQuestion[];
    house_questions: HouseQuestion[];
}
