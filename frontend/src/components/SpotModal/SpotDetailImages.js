import React from 'react';

const SpotDetailImages = ({ spot }) => {
  if (!spot || !spot.images || spot.images.length === 0) {
    return null; // Handle the case when spot, spot.images, or spot.images is an empty array
  }

  return (
    <div>
      <h4>Images:</h4>
      {/* Render large image */}
      <img src={spot.images[0].url} alt={`${spot.name} - Large`} />
      {/* Render small images */}
      {spot.images.slice(1, 5).map((image, index) => (
        <img key={index} src={image.url} alt={`${spot.name} - Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default SpotDetailImages;

