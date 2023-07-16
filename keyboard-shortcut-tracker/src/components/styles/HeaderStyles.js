// styles/HeaderStyles.js
import styled from 'styled-components';

const HeaderContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
  }

  button {
    background-color: #ff4500;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;

    &:hover {
      background-color: #e63900;
    }
  }
`;

const Nav = styled.nav`
    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        
        li {
            margin-left: 1rem;
        }

        a {
            color: white;
            text-decoration: none;
    }
`;

export { HeaderContainer, Nav };