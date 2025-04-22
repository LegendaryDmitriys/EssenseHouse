
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const QuestionPlaceholder: React.FC = () => {
    return (
        <Card className="p-6 h-96 flex flex-col items-center justify-center text-center text-gray-500">
            <HelpCircle size={48} className="mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Выберите вопрос</h3>
            <p>Выберите вопрос из списка слева, чтобы просмотреть подробности</p>
        </Card>
    );
};

export default QuestionPlaceholder;
