import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, updateReviewStatus } from "../../redux/features/reviews/reviewsSlice.ts";
import Sidebar from "./Sidebar.tsx";
import "../../styles/admin/Comment.css"
import Rating from "../Reviews/Rating.tsx";


const CommentsList: React.FC = () => {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state: any) => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    const publishedCount = reviews.filter((review) => review.status === "published").length;
    const rejectedCount = reviews.filter((review) => review.status === "rejected").length;
    const totalCount = reviews.length;

    const handleUpdateStatus = (id: number, newStatus: "published" | "rejected") => {
        dispatch(updateReviewStatus({ id, status: newStatus }));
    };


    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <h2 className="subtitle-main">Управление комментариями</h2>
                <div className="columns is-multiline">
                    <div className="column is-one-third">
                        <div className="card" style={{backgroundColor:"#fff"}}>
                            <div className="card-content has-text-centered">
                        <span className="icon is-large has-text-success">
                            <i className="fas fa-check-circle fa-2x"></i>
                        </span>
                                <p className="text-main">Опубликованные комментарии</p>
                                <p className="subtitle is-4">{publishedCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="column is-one-third">
                        <div className="card" style={{backgroundColor:"#fff"}}>
                            <div className="card-content has-text-centered" >
                        <span className="icon is-large has-text-danger">
                            <i className="fas fa-times-circle fa-2x"></i>
                        </span>
                                <p className="text-main">Отказанные комментарии</p>
                                <p className="subtitle is-4">{rejectedCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="column is-one-third">
                        <div className="card" style={{backgroundColor:"#fff"}}>
                            <div className="card-content has-text-centered">
                        <span className="icon is-large has-text-info">
                            <i className="fas fa-comment-dots fa-2x"></i>
                        </span>
                                <p className="text-main">Общее количество комментариев</p>
                                <p className="subtitle is-4">{totalCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {reviews.map((review) => (
                        <div key={review.id} className="comment mb-4">
                            <div className="media-content">
                                <Rating rating={review.rating} setRating={() => {
                                }}/>
                                <p>{review.name}</p>
                                <p>{review.review}</p>
                                {review.file_name && review.file_size ? (
                                    <div className='review-files'>
                                        <p>Приложенные документы:</p>
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
                            <div className="media-right">
                                <div className="buttons">
                                    <button
                                        className="button is-small is-success"
                                        onClick={() => handleUpdateStatus(review.id, "published")}
                                        disabled={review.status === "published"}
                                    >
                                        Опубликовать
                                    </button>
                                    <button
                                        className="button is-small is-danger"
                                        onClick={() => handleUpdateStatus(review.id, "rejected")}
                                        disabled={review.status === "rejected"}
                                    >
                                        Отклонить
                                    </button>

                                </div>
                                <p>
                                    <span
                                        className={`tag ${
                                            review.status === "published" ? "is-success" : "is-danger"
                                        }`}
                                    >
                                        {review.status === "published" ? "Опубликован" : "Отказан"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default CommentsList;
