import React from "react"

type QuestionsHouseProps = {
    questions: any[];
    onOpenModal: (question: any) => void;
};

const QuestionsHouse: React.FC<QuestionsHouseProps> = ({ questions, onOpenModal }) => {

    const statusLabels = {
        waiting: { label: 'Ожидает ответа', className: 'has-background-warning text-main' },
        answered: { label: 'Ответ предоставлен', className: 'has-background-success text-main' },
        closed: { label: 'Закрыт', className: 'has-background-grey-light text-main' },
    };

    return (
        <table className="table is-fullwidth is-striped">
            <thead>
            <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Дом</th>
                <th>Вопрос</th>
                <th>Дата создания</th>
                <th>Ответ</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {questions.map((question) => (
                <tr key={question.id}>
                    <td>{question.name}</td>
                    <td>{question.phone}</td>
                    <td>{question.email}</td>
                    <td>{question.house}</td>
                    <td>{question.question}</td>
                    <td>{new Date(question.created_at).toLocaleDateString()}</td>
                    <td>
                        <button className="button is-small is-primary"
                                onClick={() => onOpenModal(question)}>
                            Ответить
                        </button>
                    </td>
                    <td className={`tag ${statusLabels[question.status].className}`}>
                        {statusLabels[question.status].label}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default QuestionsHouse