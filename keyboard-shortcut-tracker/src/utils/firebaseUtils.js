import { database, ref, set } from "../firebase";


const addShortcutToDatabase = (shortcut) => {
    set(ref(database, 'shortcuts/' + shortcut.title), {
        title: shortcut.title,
        description: shortcut.description
    });
}

export { addShortcutToDatabase };