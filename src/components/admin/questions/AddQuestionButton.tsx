
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddQuestionButtonProps {
    onClick: () => void;
    label?: string;
}

const AddQuestionButton: React.FC<AddQuestionButtonProps> = ({ onClick, label = "Новый вопрос" }) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={onClick}
                className="bg-construction-blue-600 hover:bg-construction-blue-700"
            >
                <Plus className="mr-2 h-4 w-4" />
                {label}
            </Button>
        </div>
    );
};

export default AddQuestionButton;
