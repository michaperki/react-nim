// components/ShortcutForm.js
import React, { useState } from 'react';
import { FormContainer } from './styles/FormStyles'; // Import the styles

const ShortcutForm = ({ onShortcutSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const shortcut = { title, description };
    onShortcutSubmit(shortcut);
    setTitle('');
    setDescription('');
  };

  return (
    <FormContainer>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Shortcut</button>
          </form>
        </div>
      </section>
    </FormContainer>
  );
};

export default ShortcutForm;