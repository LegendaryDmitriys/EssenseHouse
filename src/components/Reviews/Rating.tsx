import React from 'react';

interface RatingProps {
    rating: number;
    setRating: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, setRating }) => {
    return (
        <div className="rating">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`icon ${index < rating ? 'has-text-warning' : 'has-text-grey-light'}`}
                    onClick={() => setRating(index + 1)}
                    style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '0.3rem' }}
                >
                    <i className="fas fa-star"></i>
                </span>
            ))}
        </div>
    );
};

export default Rating;
