// components/ShortcutList.js
import React from 'react';
import { ShortcutListContainer } from './styles/ListStyles'; // Import the styles

const ShortcutList = ({ shortcuts }) => {
  return (
    <ShortcutListContainer>
      <ul>
        {shortcuts.map((shortcut) => (
          <li key={shortcut.title}>
            <div>
              <h3>{shortcut.title}</h3>
              <p>{shortcut.description}</p>
            </div>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </ShortcutListContainer>
  );
};

export default ShortcutList;
