// styles/ShortcutListStyles.js
import styled from 'styled-components';

export const ShortcutListContainer = styled.div`
  margin-top: 2rem;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
    }

    p {
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }

    button {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.25rem 0.75rem;
      cursor: pointer;
      font-size: 0.9rem;
      border-radius: 5px;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;
