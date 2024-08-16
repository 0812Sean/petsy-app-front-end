import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Stars.css';

export const StarPrompt = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

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
              color={currentRating <= (hover || rating) ? '#ffc107' : '#a5a9b9'}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </>
  );
};

export const StarReview = ({ stars }) => {
  return (
    <>
      {[...Array(5)].map((_, starIdx) => {
        const currentRating = starIdx + 1;
        return (
          <FaStar key={starIdx} className="star starStatic" size={20} color={currentRating <= stars ? '#ffc107' : '#a5a9b9'} />
        );
      })}
    </>
  );
};
