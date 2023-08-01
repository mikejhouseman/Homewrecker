// frontend/src/components/AddReviewModal/index.js
import React, { useState } from "react";
import * as reviewActions from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddReviewModal.css";

function AddReviewModal() {
  const dispatch = useDispatch();
  const [stars, setStars] = useState();
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(reviewActions.addNewReview({ stars, reviewText }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Stars
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        {errors.stars && ( <p>{errors.stars}</p>)}
        <label>
          Review
          <input
            type="text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </label>
        {errors.reviewText && ( <p>{errors.reviewText}</p>)}
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default AddReviewModal;
