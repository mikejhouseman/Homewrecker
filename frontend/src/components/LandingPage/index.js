// frontend/src/components/LandingPage/LandingPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './LandingPage.css';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';
import AddSpotModal from '../AddSpotModal';
import homewreckerLogo from './homewreckerLogo.png';
import SpotModal from '../SpotModal';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots);
  const sessionUser = useSelector(state => state.session.user);
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  useEffect(() => {
    const fetchAvgRatings = async () => {
      try {
        for (const spotId in spots) {
          const response = await fetch(`/api/spots/${spotId}`);
          if (response.ok) {
            const spotData = await response.json();
            spots[spotId].avgRating = spotData.avgStarRating || null;
          }
        }
      } catch (error) {
        console.error('Error fetching average ratings', error);
      }
    };
    fetchAvgRatings();
  }, [spots]);

  const toggleAddSpotModal = () => {
    setShowAddSpotModal(prevState => !prevState);
  };

  const handleSpotTileClick = (spotId) => {
    setSelectedSpot(spots[spotId]);
  };

  const handleCloseSpotModal = () => {
    setSelectedSpot(null);
  };

  return (
    <div className="landing-page">
      <Navigation isLoaded={true} />
      <img src={homewreckerLogo} alt="Homewrecker Logo" className="landing-page__logo" />
      <h1 className="landing-page__title">Check in, Wreck it!</h1>
      <div className="landing-page__content">
        <div className="landing-page__content__spots">
          <h2>Spots</h2>
          <ul className="landing-page__spot-list">
            {Object.values(spots)?.map((spot) => (
              <li key={spot.id} className="landing-page__spot-tile">
                <Link
                  to={`/spots/${spot.id}`}
                  className="landing-page__spot-link"
                  onClick={() => handleSpotTileClick(spot.id)}
                >
                  <img src={spot.previewImage} alt={spot.previewImage} className="landing-page__spot-image" />
                  <span className="landing-page__spot-name">{spot.name}</span>
                  <span className="landing-page__spot-location">
                    {spot.city}, {spot.state}
                  </span>
                  <span className="landing-page__spot-price">
                    ${spot.price} night
                  </span>
                  <span className="landing-page__spot-avg-rating">
                    {spot.avgRating ? ` ${spot.avgRating.toFixed(1)}` : ' New'}
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
      {selectedSpot && (
        <SpotModal spot={selectedSpot} onClose={handleCloseSpotModal} />
      )}
    </div>
  );
};

export default LandingPage;
