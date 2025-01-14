import { openDB} from 'idb';

const initdb = async () =>
  openDB('text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text-editor')) {
        console.log('text-editor database already exists');
        return;
      }
      db.createObjectStore('text-editor', { keyPath: 'id', autoIncrement: true });
      console.log('text-editor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const db = await openDB('text-editor', 1);
  const tx = db.transaction('text-editor', 'readwrite');
  const store = tx.objectStore('text-editor');
  const request = store.put({id: 1, text: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  };

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const db = await openDB('text-editor', 1);
  const tx = db.transaction('text-editor', 'readonly');
  const store = tx.objectStore('text-editor');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

initdb();
