const admin = require('firebase-admin');
admin.initializeApp();

const faker = require('faker');
const db = admin.firestore();

/* Populate Algolia index with fake data for testing purposes */
const fakeIt = () => {
  return db.collection('songs').add({
    artists: faker.internet.userName(),
    title: faker.internet.userName(),
    albumCoverLink: faker.internet.url()
  });
};

/* Array size corresponds with how many fake song documents to create */
Array(5).fill(0).forEach(fakeIt);
