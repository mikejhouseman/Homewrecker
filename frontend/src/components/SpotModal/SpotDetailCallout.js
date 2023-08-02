import React from 'react';

const SpotDetailCallout = ({ spot }) => {
  if (!spot) {
    return null; // Handle the case when spot is undefined
  }

  return (
    <div>
      <h4>Callout Information:</h4>
      <p>{spot.price} night</p>
      <button onClick={() => alert('Feature coming soon')}>Reserve</button>
    </div>
  );
};

export default SpotDetailCallout;

