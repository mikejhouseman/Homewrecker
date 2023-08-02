import React from 'react';
import { useHistory } from 'react-router-dom';
import './SpotModal.css'; // Import the CSS file
import SpotDetailImages from './SpotDetailImages';

const SpotModal = ({ spot, user, onClose }) => {
  const history = useHistory();

  const handleCloseModal = () => {
    onClose();
    history.push('/'); // Redirect to the landing page
  };

  return (
    <div className="spot-modal">
      <div className="spot-modal__content">
        <h3>{spot.name}</h3>
        <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
        <SpotDetailImages spot={spot} />
        <p>Hosted by {user.firstName} {user.lastName}</p>
        <p>{spot.description}</p>
        <div className="spot-modal__callout">
          <p>Price: ${spot.price} per night</p>
          <button onClick={() => alert('Feature coming soon')}>Reserve</button>
        </div>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default SpotModal;

