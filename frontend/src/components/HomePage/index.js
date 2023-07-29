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
  console.log(spots);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(  ()  => async () => {
    await dispatch(getSpots());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getSpots());
  // }, [dispatch]);

  return (
    <div className="home-page">
      <Navigation isLoaded={true} />
      <div className="home-page__content">
        <div className="home-page__content__spots">
          <h2>Spots</h2>
          <ul>
            {spots?.map((spot, i) => (
              <li key={spot.id}>
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>{spot?.name}</NavLink>
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
