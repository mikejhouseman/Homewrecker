// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  // const dispatch = useDispatch();

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <div>
  //       <ProfileButton user={sessionUser} />
  //       <button onClick={logout}>Log Out</button>
  //     </div>
  //   );
  // } else {
  //   sessionLinks = (
  //     <li>
  //       <NavLink to="/login">Log In</NavLink>
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </li>
  //   );
  // }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    );
  }

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
