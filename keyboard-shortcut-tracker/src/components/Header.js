// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContainer, Nav } from './styles/HeaderStyles';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <HeaderContainer>
      <Nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={onLogout}>Log Out</button>
            </li>
          )}
        </ul>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;