// src/utils/localStorage.js

const KEYBOARD_SHORTCUTS_KEY = 'keyboardShortcuts';

export const getKeyboardShortcuts = () => {
  const storedData = localStorage.getItem(KEYBOARD_SHORTCUTS_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const setKeyboardShortcuts = (shortcuts) => {
  localStorage.setItem(KEYBOARD_SHORTCUTS_KEY, JSON.stringify(shortcuts));
};
