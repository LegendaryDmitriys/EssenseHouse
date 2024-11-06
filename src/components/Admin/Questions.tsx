import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserQuestions, updateUserQuestionStatus } from "../../redux/features/questions/userQuestionsSlice.ts";

const Questions: React.FC = () => {
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state: RootState) => state.question);

    const [localQuestions, setLocalQuestions] = useState(questions);

    useEffect(() => {
        dispatch(fetchUserQuestions());
    }, [dispatch]);

    useEffect(() => {
        setLocalQuestions(questions);
    }, [questions]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const statusLabels = {
        waiting: { label: 'Ожидает ответа', className: 'has-background-warning text-main' },
        answered: { label: 'Ответ предоставлен', className: 'has-background-success text-main' },
        closed: { label: 'Закрыт', className: 'has-background-grey-light text-main' },
    };

    const handleStatusChange = async (questionId: number, newStatus: string) => {
        try {
            await dispatch(updateUserQuestionStatus({ id: questionId, status: newStatus }));
        } catch (error) {
            console.error("Ошибка при изменении статуса:", error);
            alert("Не удалось обновить статус.");
        }
    };

    return (
        <div className="table-container">
            <table className="table is-fullwidth is-striped">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Телефон</th>
                    <th>Дата создания</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {localQuestions.map((question) => (
                    <tr key={question.id}>
                        <td>{question.name}</td>
                        <td>{question.phone}</td>
                        <td>{new Date(question.created_at).toLocaleDateString()}</td>
                        <td className={`tag ${statusLabels[question.status]?.className}`}>
                            {statusLabels[question.status]?.label}
                        </td>
                        <td>
                            <button
                                className="button is-small is-warning"
                                onClick={() => handleStatusChange(question.id, "waiting")}
                                disabled={question.status === "waiting"}
                            >
                                Ожидает ответа
                            </button>
                            <button
                                className="button is-small is-success"
                                onClick={() => handleStatusChange(question.id, "answered")}
                                disabled={question.status === "answered"}
                            >
                                Ответ предоставлен
                            </button>
                            <button
                                className="button is-small is-danger"
                                onClick={() => handleStatusChange(question.id, "closed")}
                                disabled={question.status === "closed"}
                            >
                                Закрыт
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Questions;
