import React, { useState } from 'react';

const StarRating = ({ initialValue, onRate }) => {
  const [rating, setRating] = useState();

  const handleRate = (newRating) => {
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${rating >= value ? 'filled' : ''}`}
          onClick={() => handleRate(value)}
        >
          ★
        </span>
      ))}
      {rating !== undefined && <span className="rating-score">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
