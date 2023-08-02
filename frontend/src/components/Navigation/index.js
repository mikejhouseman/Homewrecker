// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSignup = () => {
    setShowSignupModal(true);
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/spots" activeClassName="active">
            Add Spot
          </NavLink>
        </li>
        <li>
          {sessionUser ? (
            <ProfileButton key={sessionUser.id} />
          ) : (
            <>
              <NavLink to="/login" activeClassName="active">
                Log in
              </NavLink>
              <button onClick={handleSignup}>Sign up</button>
              {showSignupModal && <SignupFormModal />}
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
