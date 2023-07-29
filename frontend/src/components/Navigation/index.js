// frontend/src/components/Navigation/index.js
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// // import SignupFormModal from "../SignupFormModal";
// // import * as sessionActions from '../../store/session';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);
//   // const dispatch = useDispatch();

//   // const logout = (e) => {
//   //   e.preventDefault();
//   //   dispatch(sessionActions.logout());
//   // };

//   let sessionLinks;
//   if (sessionUser) {
//     // sessionLinks = (
//     //   <div>
//     //     <ProfileButton user={sessionUser} />
//     //     <button onClick={logout}>Log Out</button>
//     //   </div>
//     // );
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       // <li>
//       //   <NavLink to="/login">Log In</NavLink>
//       //   <NavLink to="/signup">Sign Up</NavLink>
//       // </li>
//       <li>
//       <OpenModalButton
//         buttonText="Log In"
//         modalComponent={<LoginFormModal />}
//       />
//       <NavLink to="/signup">Sign Up</NavLink>
//       {/* <OpenModalButton
//         buttonText="Sign Up"
//         modalComponent={<SignupFormModal />}
//       /> */}
//     </li>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink exact to="/">
//           Home
//         </NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;


// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
