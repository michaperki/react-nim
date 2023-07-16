// firebaseUtils.js
import { database, ref, set } from '../firebase';

const addShortcutToDatabase = (shortcut, userId, userEmail) => {
  set(ref(database, `users/${userId}/shortcuts/${shortcut.title}`), {
    title: shortcut.title,
    description: shortcut.description,
    userId: userId,
    userEmail: userEmail,
  });
};

export { addShortcutToDatabase };