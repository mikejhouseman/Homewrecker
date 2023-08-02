import React from 'react';

const SpotDetailDescription = ({ spot }) => {
  if (!spot) {
    return null; // Handle the case when spot is undefined
  }

  return (
    <div>
      <h4>Description:</h4>
      <p>{spot.description}</p>
    </div>
  );
};

export default SpotDetailDescription;

