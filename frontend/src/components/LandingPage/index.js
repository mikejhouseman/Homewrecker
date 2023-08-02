// frontend/src/components/LandingPage/index.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './LandingPage.css';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';
import AddSpotModal from '../AddSpotModal';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots));
  const sessionUser = useSelector(state => state.session.user);
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const toggleAddSpotModal = () => {
    setShowAddSpotModal(prevState => !prevState);
  };

  // Function to get the star rating or display "New" if no reviews
  const getStarRating = spot => {
    const avgRating = spot.avgStarRating;
    return avgRating !== undefined ? avgRating.toFixed(1) : 'New';
  };

  return (
    <div className="landing-page">
      <Navigation isLoaded={true} />
      <h1 className="landing-page__title">Welcome to Homewrecker</h1>
      <div className="landing-page__content">
        <div className="landing-page__content__spots">
          <h2>Spots</h2>
          <ul className="spot-list">
            {spots?.map(spot => (
              <li key={spot.id} className="spot-tile">
                <Link to={`/spots/${spot.id}`} className="spot-link">
                  <img src={spot.previewImage} alt={spot.previewImage} className="spot-image" />
                  <span className="spot-location">
                    {spot.city}, {spot.state}, ${spot.price} night
                  </span>
                  <span className="spot-rating">
                    Rating: {getStarRating(spot)}
                    {spot.avgStarRating !== undefined && (
                      <span className="spot-tooltip">{spot.name}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={toggleAddSpotModal}>Add Spot</button>
          {showAddSpotModal && <AddSpotModal />}
        </div>
      </div>
      {sessionUser && <ProfileButton key={sessionUser.id} />}
    </div>
  );
};

export default LandingPage;
