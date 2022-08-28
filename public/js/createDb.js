// import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

let db;

window.onload = function () {
  Modernizr.on('indexeddb', function (result) {
    if (result) {
      openIndexDb();
    } else {
      // not-supported
      console.log('IndexedDB is not supported');
      return;
    }
  });
};

//create and/or access local db copy of entries obtained with fetch
function openIndexDb() {
  const openRequest = window.indexedDB.open('dictionary_db', 1);

  // set up database tables if not already done
  openRequest.onupgradeneeded = function (event) {
    db = openRequest.result;
    // create objectStore to store entries
    const objectStore = db.createObjectStore('dictionary_os', {
      keyPath: 'id',
      autoIncrement: true,
    });
    // define schema
    objectStore.createIndex('traditional', 'traditional', { unique: false });
    objectStore.createIndex('simplified', 'simplified', { unique: false });
    objectStore.createIndex('pinyin', 'pinyin', { unique: true });
    objectStore.createIndex('english', ['english'], { unique: false });
    objectStore.createIndex('created', 'date', { unique: false });
    console.log('Database setup complete');
  };
  openRequest.onerror = function (event) {
    console.error('Database failed to open ', openRequest.error);
  };
  openRequest.onsuccess = function (event) {
    db = openRequest.result;
    console.log('Database opened successfully');
    checkNumOfDictStoreEntries();
  };
}

function checkNumOfDictStoreEntries() {
  const tx = db.transaction('dictionary_os', 'readonly');
  const objectStore = tx.objectStore('dictionary_os');
  const countRequest = objectStore.count();
  countRequest.onsuccess = (event) => {
    let recordCount = countRequest.result;
    console.log(`Number of remaining records is ${recordCount}`);
    if (recordCount < 40) {
      fetchDataFromMongoDB();
    }
  };
  countRequest.onerror = (event) => {
    console.warn(
      `Object store error, failed to count entries ${countRequest.error}`
    );
  };
}

function fetchDataFromMongoDB() {
  fetch('api/dict_entries_test')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // seedIndexedDB(data);
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation: ',
        error
      );
    });
}

function seedIndexedDB(data) {
  const transaction = db.transaction('dictionary_os', 'readwrite');
  const objectStore = transaction.objectStore('dictionary_os');
  let totalRecords = 0;

  for (let i = 0; i < data.length; i++) {
    let newEntry = {};
    for (const property in data[i]) {
      newEntry = {
        traditional: data[i]['traditional'],
        simplified: data[i]['simplified'],
        pinyin: data[i]['pinyin'],
        english: data[i]['english'],
        created: new Date(),
      };
    }
    let addRequest = objectStore.add(newEntry);
    addRequest.onsuccess = function () {
      totalRecords++;
    };
    addRequest.onerror = function (event) {
      console.log('Add Request failed ', addRequest.error);
    };
  }
  transaction.oncomplete = function () {
    console.log(`All requests have succeeded and the transaction has committed. The
    number of records added  = ${totalRecords}`);
  };
  transaction.onabort = function (event) {
    console.log(`Transactions not committed ${transaction.error}`);
  };
}

async function getListItemsData() {
  let keysToDelete = [];
  let listItemArray = [];
  let mydb = await openDB('dictionary_db', 1);
  let cursor = await mydb.transaction('dictionary_os').store.openCursor();
  let i = 0;
  while (i < 4 && cursor) {
    listItemArray.push(cursor.value);
    keysToDelete.push(cursor.key);
    cursor = await cursor.continue();
    i++;
  }
  const tx = mydb.transaction('dictionary_os', 'readwrite');
  await Promise.all([
    keysToDelete.map((key) => {
      tx.store.delete(key);
    }),
    tx.done,
  ]);
  checkNumOfDictStoreEntries();
  return listItemArray;
}

export { getListItemsData };
