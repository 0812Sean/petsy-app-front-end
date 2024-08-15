import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './StarRating.css';

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(null);

  return (
    <>
      {[...Array(5)].map((_, starIdx) => {
        const currentRating = starIdx + 1;
        return (
          <label key={starIdx}>
            <input
              className="star-input"
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <FaStar
              className="star"
              size={20}
              color={currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </>
  );
};



export default StarRating
