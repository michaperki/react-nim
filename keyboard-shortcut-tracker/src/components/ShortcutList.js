import React from 'react';

const ShortcutList = ({ shortcuts }) => {
    console.log(shortcuts);
  return (
    <ul>
      {shortcuts.map((shortcut, index) => (
        <li key={index}>
          {shortcut.title}: {shortcut.description}
        </li>
      ))}
    </ul>
  );
};

export default ShortcutList;
