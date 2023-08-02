// frontend/src/components/SpotModal/index.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './SpotModal.css'; // Import the CSS file
import SpotDetailImages from './SpotDetailImages';

const SpotModal = ({ onClose }) => {
  const { id } = useParams(); // Get the spot id from the URL
  const history = useHistory();
  const spot = useSelector((state) => state.spots.list[id]); // Get the spot details from the state using the id
  const user = useSelector((state) => state.spots.users[spot?.userId]); // Get the user details from the state using the userId

  const handleCloseModal = () => {
    onClose();
    history.push('/'); // Redirect to the landing page
  };

  if (!spot || !user) {
    return null; // If either spot or user is undefined, return null to avoid accessing their properties.
  }

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
