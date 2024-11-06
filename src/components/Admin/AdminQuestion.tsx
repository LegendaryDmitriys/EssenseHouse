import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {fetchUserQuestionsHouse, updateUserQuestionHouseStatus} from "../../redux/features/questions/userQuestionsHouseSlice.ts";
import axios from "axios";
import config from "../../api/api.ts";
import Modal from "../Modal.tsx";
import Questions from "./Questions.tsx";
import QuestionsHouse from "./QuestionsHouse.tsx";

const AdminQuestion: React.FC = () => {
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state: RootState) => state.questionsHouse);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answer, setAnswer] = useState("");

    const statusLabels = {
        waiting: { label: 'Ожидает ответа', className: 'has-background-warning text-main' },
        answered: { label: 'Ответ предоставлен', className: 'has-background-success text-main' },
        closed: { label: 'Закрыт', className: 'has-background-grey-light text-main' },
    };

    useEffect(() => {
        dispatch(fetchUserQuestionsHouse());
    }, [dispatch]);

    const handleOpenModal = (question: any) => {
        setSelectedQuestion(question);
    };

    const handleCloseModal = () => {
        setSelectedQuestion(null);
        setAnswer("");
    };

    const handleSendAnswer = async () => {
        if (selectedQuestion) {
            console.log("Selected Question ID:", selectedQuestion.id);
            try {
                const response = await axios.post(
                    `${config.API_URL}mail/send-answer/`,
                    {
                        email: selectedQuestion.email,
                        questionId: selectedQuestion.id,
                        answer: answer,
                    },
                );

                dispatch(updateUserQuestionHouseStatus({ id: selectedQuestion.id, status: 'answered' }))

                alert("Ответ отправлен на почту!");
                handleCloseModal();
            } catch (error) {
                console.error("Ошибка при отправке ответа:", error);
                alert("Не удалось отправить ответ.");
            }
        }
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <h2 className="subtitle-main">Вопросы пользователей о домах</h2>

                {loading && <p>Загрузка...</p>}
                {error && <p className="has-text-danger">{error}</p>}

                <QuestionsHouse questions={questions} onOpenModal={handleOpenModal}/>
                <h2 className="subtitle-main">Заявки на звонки</h2>
                <Questions/>
            </main>
            {selectedQuestion && (
                <Modal onClose={handleCloseModal}>
                    <div>
                        <h3>Ответить на вопрос</h3>
                        <p><strong>Вопрос:</strong> {selectedQuestion.question}</p>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Введите ваш ответ"
                            rows={5}
                            style={{ width: "100%" }}
                        />
                        <button className="button is-primary" onClick={handleSendAnswer}>
                            Отправить ответ
                        </button>
                        <button className="button is-light" onClick={handleCloseModal}>
                            Закрыть
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminQuestion;
