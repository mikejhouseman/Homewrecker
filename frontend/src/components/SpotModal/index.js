// frontend/src/components/HomePage/SpotModal.js
import React from 'react';
import './SpotModal.css'; // Import the CSS file

const SpotModal = ({ spot, onClose }) => {
  return (
    <div className="spot-modal">
      <div className="spot-modal__content">
        <h3>{spot.name}</h3>
        <p>{spot.city}, {spot.state}</p>
        <p>Price: ${spot.price}</p>
        <p>Average Rating: {spot.avgStarRating}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SpotModal;
