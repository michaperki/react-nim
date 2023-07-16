// components/PopularShortcutsGrid.js
import React from 'react';
import { PopularShortcutsContainer, ShortcutCard } from './styles/HomeStyles';

const PopularShortcutsGrid = ({ popularShortcuts }) => {
  return (
    <PopularShortcutsContainer>
      {popularShortcuts.map((shortcut) => (
        <ShortcutCard key={shortcut.title}>
          <div className="shortcut-keys">
            {shortcut.keys.map((key) => (
              <div key={key} className="keyboard-key">
                {key}
              </div>
            ))}
          </div>
          <div className="shortcut-title">{shortcut.title}</div>
          <div className="shortcut-application">
            <img src={shortcut.logo} alt={shortcut.application} />
            <span>{shortcut.application}</span>
          </div>
        </ShortcutCard>
      ))}
    </PopularShortcutsContainer>
  );
};

export default PopularShortcutsGrid;
