/* // frontend/src/components/SpotDetails/index.js */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);

  if (!spot) {
    return <div>Spot not found.</div>;
  }

  return (
    <div>
      <h2>{spot.name}</h2>
      <div>
        {/* Render the spot details here */}
        {/* For example: */}
        <p>City: {spot.city}</p>
        <p>State: {spot.state}</p>
        <p>Price: ${spot.price}</p>
        {/* Add more spot details as needed */}
      </div>
    </div>
  );
};

export default SpotDetailsPage;
