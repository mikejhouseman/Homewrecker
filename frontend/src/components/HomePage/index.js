// frontend/src/components/HomePage/index.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './HomePage.css';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';
import AddSpotModal from '../AddSpotModal';



const HomePage = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots));
  const sessionUser = useSelector(state => state.session.user);
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const toggleAddSpotModal = () => {
    setShowAddSpotModal((prevState) => !prevState);
  };

  return (
    <div className="home-page">
      <Navigation isLoaded={true} />
      <h1 className="home-page__title">Welcome to Homewrecker</h1>
      <div className="home-page__content">
        <div className="home-page__content__spots">
          <h2>Spots</h2>
          <ul className="spot-list">
            {spots?.map((spot, i) => (
              <li key={spot.id} className="spot-tile">
                <Link to={`/spots/${spot.id}`} className="spot-link">
                  <img src={spot.previewImage} alt={spot.previewImage} className="spot-image" />
                  <span className="spot-name">{spot.name}</span>
                  <span className="spot-location">{spot.city}, {spot.state}, ${spot.price}, {spot.avgStarRating}</span>
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

export default HomePage;
