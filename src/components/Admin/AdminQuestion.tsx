import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar.tsx";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";
import {fetchUserQuestionsHouse, updateUserQuestionHouseStatus} from "../../redux/features/questions/userQuestionsHouseSlice.ts";
import axios from "axios";
import config from "../../api/api.ts";
import Modal from "../Modal.tsx";
import Questions from "./Questions.tsx";
import QuestionsHouse from "./QuestionsHouse.tsx";
import { UserQuestionHouse } from "../../redux/features/questions/userQuestionsHouseSlice.ts"


const AdminQuestion: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { questions, loading, error } = useSelector((state: RootState) => state.questionsHouse);
    const [selectedQuestion, setSelectedQuestion] = useState<UserQuestionHouse | null>(null);
    const [answer, setAnswer] = useState("");


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
            try {
                await axios.post(
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
                <div className="buttons">
                    <a href={`${config.API_URL}export_user_questions_and_houses/`} className="button is-small is-primary" download>
                        Экспортировать в Excel
                    </a>
                </div>
                {loading && <p>Загрузка...</p>}
                {error && <p className="has-text-danger">{error}</p>}

                <QuestionsHouse questions={questions} onOpenModal={handleOpenModal}/>
                <h2 className="subtitle-main">Заявки на звонки</h2>
                <Questions/>
            </main>
            {selectedQuestion && (
                <Modal onClose={handleCloseModal}>
                    <div>
                        <h3 className="subtitle">Ответить на вопрос</h3>
                        <p className="text-main" style={{marginBottom: "20px"}}>Вопрос:  <br></br>
                            {selectedQuestion.question}
                        </p>
                        <textarea
                            className="input is-small white-textarea text-main"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Введите ваш ответ"
                            rows={5}
                            style={{minHeight: "150px", minWidth: "100%"}}

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
