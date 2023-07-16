// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    max-width: 800px;
    margin: 0 auto;
  }

  li {
    margin-right: 1rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem;
    transition: 0.2s ease-in-out;

    &:hover {
      color: #ff5722;
    }
  }
`;

const message = styled.h2`
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem;
    transition: 0.2s ease-in-out;
`;


const Header = ({ isLoggedIn }) => {


  return (
    <HeaderWrapper>
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
              <message>Welcome User</message>
            </li>
          )}
        </ul>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;