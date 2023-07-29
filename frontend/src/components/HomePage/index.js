// frontend/src/components/HomePage/index.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './HomePage.css';
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';

const HomePage = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector(state => state.spots));

  const sessionUser = useSelector(state => state.session.user);

  // useEffect(  ()  => async () => {
  //   await dispatch(getSpots());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div className="home-page">
      <Navigation isLoaded={true} />
      <div className="home-page__content">
        <div className="home-page__content__spots">
          <h2>Spots</h2>
          {/* <ul>
            {spots?.map((spot, i) => (
              <li key={spot.id}>
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>{spot?.previewImage} {spot?.name} {spot?.city}, {spot?.state}, ${spot?.price} </NavLink>
              </li>
            ))}
          </ul> */}
          <ul className="spot-list">
            {spots?.map((spot, i) => (
              <li key={spot.id} className="spot-tile">
                <NavLink to={`/spots/${spot.id}`} className="spot-link">
                  <img src={spot.previewImage} alt={spot.name} className="spot-image" />
                  <span className="spot-name">{spot.name}</span>
                  <span className="spot-location">{spot.city}, {spot.state}, ${spot.price}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {sessionUser && <ProfileButton key={sessionUser.id} />}
    </div>
  );
};

export default HomePage;
