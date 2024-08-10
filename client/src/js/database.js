import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  //this is the DB and version
  const jateDB = await openDB("jate", 1);
  //new transaction defines db and privlage
  const tx = jateDB.transaction("jate", "readwrite");
  //opens set object in store
  const store = tx.objectStore("jate");
  //passes content
  const request = store.put({id:1, value: content});
  //confirms
  const result= await request;
  console.log("data saved to DB", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
  const jateDB= await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request= store.get(1);
  const result= await request;
  console.log("date read to DB", result);
  return result.value;
}

initdb();
