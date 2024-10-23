import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const ReviewSkeleton: React.FC = () => {
    return (
        <div className="reviews-people skeleton">
            <div className="reviews-people__inner">
                <Skeleton circle={true} height={50} width={50} />
                <div className="reviews-people_head">
                    <article>
                        <Skeleton width={100} height={15} style={{ marginBottom: '0.5rem' }} />
                        <Skeleton width={150} height={20} />
                    </article>
                    <Skeleton width={80} height={20} />
                </div>
            </div>
            <div className="review-text">
                <Skeleton count={3} />
            </div>
            <div className="review-file">
                <Skeleton height={50} width={50} style={{ marginRight: '1rem' }} />
                <Skeleton width={150} height={20} />
            </div>
        </div>
    );
};

export default ReviewSkeleton;
