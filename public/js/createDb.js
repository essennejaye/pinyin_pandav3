let db;

function getWords() {
  fetch('/dict_entries')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      add(data);
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation: ',
        error
      );
    });
}

//create and/or access local db copy of entries obtained fetch
function createIndexDb() {
  const openRequest = window.indexedDB.open('dictionary_db', 1);

  openRequest.addEventListener('error', () =>
    console.error('Database failed to open')
  );
  openRequest.addEventListener('success', () => {
    db = openRequest.result;
    console.log('Database opened successfully');
  });
  // set up database tables if not already done
  openRequest.addEventListener('upgradeneeded', (event) => {
    db = event.target.result;
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
    console.log('Database setup complete');
  });
  getWords();
}

function add(dictEntries) {
  for (let i = 0; i < dictEntries.length; i++) {
    let newEntry = {};
    for (const property in dictEntries[i]) {
      newEntry = {
        traditional: dictEntries[i]['traditional'],
        simplified: dictEntries[i]['simplified'],
        pinyin: dictEntries[i]['pinyin'],
        english: dictEntries[i]['english'],
        created: new Date(),
      };
    }

    let transaction = db.transaction('dictionary_os', 'readwrite');
    let addRequest = transaction.objectStore('dictionary_os').add(newEntry);
    addRequest.addEventListener('success', () =>
      console.log('Add request succeeded')
    );
    addRequest.addEventListener('error', () =>
      console.log('Add Request failed ', addRequest.error)
    );
  }
}
window.addEventListener('load', () => {
  createIndexDb();
});
