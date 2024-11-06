import React, { useEffect, useState } from 'react';
import ReviewForm from "../components/Reviews/ReviewForm.tsx";
import Rating from "../components/Reviews/Rating.tsx";
import sprite from "../../public/sprite.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview } from '../redux/features/reviews/reviewsSlice';
import 'react-loading-skeleton/dist/skeleton.css';
import ReviewSkeleton from "../components/Skeleton/ReviewSkeleton.tsx";
import {AppDispatch, RootState} from "../redux/store.ts";

const Reviews: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { reviews, loading } = useSelector((state: RootState) => state.reviews);
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchReviews('published'));
    }, [dispatch]);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    const handleReviewSubmit = async (name: string, reviewText: string, rating: number, file?: File) => {
        const newReview = {
            name: name || 'Аноним',
            review: reviewText,
            date: new Date().toISOString(),
            rating,
        };

        const formData = new FormData();
        formData.append('name', newReview.name);
        formData.append('review', newReview.review);
        formData.append('rating', String(newReview.rating));
        if (file) {
            formData.append('file', file);
        }

        try {
            await dispatch(addReview(formData)).unwrap();
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        }

        setShowForm(false);
    };

    return (
        <div className="container">
            <h1 className="title-main">Отзывы клиентов</h1>
            <div className="reviews-info">
                <div className="reviews-content">
                    <svg className='icon-reviews' width={41} height={42}>
                        <use xlinkHref={sprite + "#reviews-icon"} />
                    </svg>
                    <p>Мы благодарны нашим клиентам за оказанное доверие и положительные отзывы о совместной работе. Если хотите, можем помочь и вам: наладим работу отдела продаж, установим системы видеонаблюдения и автоматизации, разработаем дизайн интерьера под любой стиль и бюджет. Просто свяжитесь с нами!</p>
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
                {loading ? (
                    <>
                        <ReviewSkeleton />
                        <ReviewSkeleton />
                    </>
                ) : (
                    reviews.length === 0 ? (
                        <p>Отзывов пока нет</p>
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
                                <div className='review-text'>
                                    <p>{review.review}</p>
                                </div>
                                {review.file_name && review.file_size ? (
                                    <div className='review-file'>
                                        <img src="../../public/doc.png" alt=""/>
                                        <article>
                                            <a href={review.file} download={review.file_name}>
                                                <p>{review.file_name}</p>
                                            </a>
                                            <p>{review.file_size} MB</p>
                                        </article>
                                    </div>
                                ) : null}
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default Reviews;
