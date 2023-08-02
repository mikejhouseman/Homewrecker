import React from 'react';

const SpotDetailHeader = ({ spot }) => {
  if (!spot || !spot.user) {
    return null; // Handle the case when spot or spot.user is undefined
  }

  return (
    <div>
      <h3>{spot.name}</h3>
      <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
      <p>Hosted by {spot.user.firstName} {spot.user.lastName}</p>
    </div>
  );
};

export default SpotDetailHeader;

