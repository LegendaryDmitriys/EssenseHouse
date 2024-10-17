import React, { useState } from 'react';
import Rating from "./Rating.tsx";

interface ReviewFormProps {
    onSubmit: (name: string, review: string, rating: number, file?: File) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState<string>('');
    const [reviewText, setReviewText] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(name, reviewText, rating, file ? file : undefined);
        setName('');
        setReviewText('');
        setRating(0);
        setFile(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-box">
            <Rating rating={rating} setRating={setRating} />
            <div className="field">
                <label className="label text-main">Ваше имя (необязательно)</label>
                <div className="control">
                    <input
                        className="review-input"
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label text-main">Ваш отзыв</label>
                <div className="control">
                    <textarea
                        className="review-textarea"
                        placeholder="Ваш отзыв"
                        required
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label text-main">Прикрепить файл (необязательно)</label>
                <div className="control">
                    <input
                        className="review-input"
                        type="file"
                        onChange={handleFileChange} // Обработчик изменения файла
                    />
                </div>
            </div>
            <div className="control">
                <button type="submit" className="button is-primary">
                    Отправить отзыв
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
