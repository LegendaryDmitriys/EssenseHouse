import React, { useState } from 'react';
import ReviewForm from "../components/Reviews/ReviewForm.tsx";
import Rating from "../components/Reviews/Rating.tsx";
import sprite from "../../public/sprite.svg";
import { formatDate } from "../utils/formatData.ts";

interface Review {
    id: number;
    name: string;
    review: string;
    date: string;
    rating: number;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false); // Состояние для управления видимостью формы

    const handleReviewSubmit = (name: string, reviewText: string, rating: number) => {
        const newReview: Review = {
            id: reviews.length + 1,
            name: name || 'Аноним',
            review: reviewText,
            date: new Date().toLocaleDateString(),
            rating,
        };

        setReviews([...reviews, newReview]);
        setShowForm(false); // Скрываем форму после отправки
    };

    return (
        <div className="container">
            <h1 className="title-main">Отзывы клиентов</h1>
            <div className="reviews-info">
                <div className="reviews-content">
                    <svg className='icon-reviews' width={41} height={42}>
                        <use xlinkHref={sprite + "#reviews-icon"} />
                    </svg>
                    <p>Мы благодарны нашим клиентам за оказанное доверие и положительные отзывы о совместной работе.
                        Если хотите, можем помочь и вам: наладим работу отдела продаж, установим системы видеонаблюдения
                        и автоматизации, разработаем дизайн интерьера под любой стиль и бюджет. Просто свяжитесь с
                        нами!</p>
                </div>
                <div>
                    <button
                        className='reviews-btn text-main'
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Закрыть' : 'Оставить свой отзыв'}
                    </button>
                </div>
            </div>

            {showForm && <ReviewForm onSubmit={handleReviewSubmit} />}

            <div>
                {reviews.length === 0 ? (
                    <></>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="reviews-people">
                            <div className='reviews-people__inner'>
                                <i className="fas fa-user fa-5x"></i>
                                <div className="reviews-people_head">
                                    <article>
                                         <span className="reviews-date">
                                        {formatDate(review.date)}
                                    </span>
                                        <p className="reviews-user">
                                            {review.name}
                                        </p>
                                    </article>
                                    <Rating rating={review.rating} setRating={() => { }} />
                                </div>
                            </div>
                            <p>{review.review}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;
