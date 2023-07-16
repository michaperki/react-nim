// components/styles/HomeStyles.js
import styled from 'styled-components';

export const PopularShortcutsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

export const ShortcutCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .shortcut-keys {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    .keyboard-key {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      background-color: #f9f9f9;
    }
  }

  .shortcut-title {
    font-size: 18px;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  .shortcut-application {
    display: flex;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
`;
