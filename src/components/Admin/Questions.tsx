import React, { useEffect, useState } from "react";
import {AppDispatch, RootState} from "../../redux/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserQuestions, updateUserQuestionStatus } from "../../redux/features/questions/userQuestionsSlice.ts";

const Questions: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
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

    type StatusType = 'waiting' | 'answered' | 'closed';

    const statusLabels: Record<StatusType, { label: string; className: string }> = {
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
            <table className="table is-fullwidth is-striped is-white">
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
                        <td>
                           <span className={`tag ${statusLabels[question.status as StatusType]?.className}`}>
                               {statusLabels[question.status as StatusType]?.label}
                           </span>
                        </td>
                        <td>
                            <div className="buttons">
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
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Questions;
