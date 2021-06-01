const admin = require('firebase-admin');
admin.initializeApp();

const faker = require('faker');
const db = admin.firestore();

const fakeIt = () => {
  return db.collection('songs').add({
    artists: faker.internet.userName(),
    title: faker.internet.userName(),
    albumCoverLink: faker.internet.url()
  });
};

Array(5).fill(0).forEach(fakeIt);
