import React from 'react';
import { database } from '../firebase';
import { ref, remove } from 'firebase/database';

const ShortcutList = ({ shortcuts, onDeleteShortcut }) => {
  const handleDelete = (shortcut) => {
    onDeleteShortcut(shortcut);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <ul>
        {shortcuts.map((shortcut) => (
          <li key={shortcut.key} className="mb-4">
            <div>
              <h3 className="text-lg font-medium">{shortcut.title}</h3>
              <p className="text-gray-700">{shortcut.description}</p>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={() => handleDelete(shortcut)}
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