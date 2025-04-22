
import { HouseQuestion, QuestionStatus, UserQuestion } from '@/types/question';


export const filterQuestions = (
    questions: (HouseQuestion | UserQuestion)[],
    search: string,
    statusFilter: string
): (HouseQuestion | UserQuestion)[] => {
    return questions.filter(question => {
        const isHouseQuestion = 'house_details' in question && 'question' in question;

        const matchesSearch =
            question.name.toLowerCase().includes(search.toLowerCase()) ||
            question.phone.toLowerCase().includes(search.toLowerCase()) ||
            (isHouseQuestion && (
                (question as HouseQuestion).house_details.title.toLowerCase().includes(search.toLowerCase()) ||
                (question as HouseQuestion).question.toLowerCase().includes(search.toLowerCase()) ||
                ((question as HouseQuestion).email?.toLowerCase().includes(search.toLowerCase()) || false)
            ));


        const matchesStatus = statusFilter === 'all' || question.status === statusFilter as QuestionStatus;

        return matchesSearch && matchesStatus;
    });
};


export const sortQuestions = (
    questions: (HouseQuestion | UserQuestion)[],
    sortBy: string,
    sortOrder: 'asc' | 'desc'
): (HouseQuestion | UserQuestion)[] => {
    return [...questions].sort((a, b) => {
        let comparison = 0;

        switch(sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'status': {
                const statusOrder: Record<QuestionStatus, number> = {
                    'waiting': 0,
                    'answered': 1,
                    'closed': 2
                };
                comparison = statusOrder[a.status] - statusOrder[b.status];
                break;
            }
            case 'date':
            default:
                comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                break;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });
};
