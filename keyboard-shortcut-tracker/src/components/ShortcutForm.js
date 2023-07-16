import React, { useState } from 'react';

const ShortcutForm = ({ onShortcutSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const shortcut = { title, description, deleted: false };
    onShortcutSubmit(shortcut);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Shortcut:
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
          Add Shortcut
        </button>
      </form>
    </div>
  );
};

export default ShortcutForm;
