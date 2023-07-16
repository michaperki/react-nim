import React from 'react';
import { database } from '../firebase';
import { ref, remove } from 'firebase/database';

const ShortcutList = ({ shortcuts, onDeleteShortcut }) => {
  // Filter out deleted shortcuts before rendering
  const nonDeletedShortcuts = shortcuts.filter((shortcut) => !shortcut.deleted);

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <ul>
        {nonDeletedShortcuts.map((shortcut) => (
          <li key={shortcut.title} className="mb-4">
            <div>
              <h3 className="text-lg font-medium">{shortcut.title}</h3>
              <p className="text-gray-700">{shortcut.description}</p>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={() => onDeleteShortcut(shortcut)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShortcutList;
