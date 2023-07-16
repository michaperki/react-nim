import React from 'react';

const PopularShortcutsGrid = ({ popularShortcuts }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      {popularShortcuts.map((shortcut) => (
        <div key={shortcut.title} className="border rounded p-4 shadow-md transition-transform transform hover:scale-105">
          <div className="flex items-center gap-2 mb-2">
            {shortcut.keys.map((key) => (
              <div key={key} className="bg-gray-100 w-8 h-8 flex items-center justify-center rounded-md text-lg font-semibold">
                {key}
              </div>
            ))}
          </div>
          <div className="text-lg font-semibold">{shortcut.title}</div>
          <div className="flex items-center gap-2">
            <img src={shortcut.logo} alt={shortcut.application} className="w-6 h-6" />
            <span>{shortcut.application}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularShortcutsGrid;
