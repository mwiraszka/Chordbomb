const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('songs');

exports.addToIndex = functions.firestore.document('songs/{songId}')
  .onCreate((snapshot) => {
    const data = snapshot.data();

    return index.saveObject({
      objectID: snapshot.id,
      artists: data.artists,
      title: data.title,
      album: data.album,
      albumCoverLink: data.albumCoverLink,
      songwriters: data.songwriters,
      producers: data.producers
    });
  });

exports.updateIndex = functions.firestore.document('songs/{songId}')
  .onUpdate((change) => {
    const newData = change.after.data();

    return index.saveObject({
      objectID: change.after.id,
      artists: newData.artists,
      title: newData.title,
      album: newData.album,
      albumCoverLink: newData.albumCoverLink,
      songwriters: newData.songwriters,
      producers: newData.producers
    });
  });

exports.deleteFromIndex = functions.firestore.document('songs/{songId}')
  .onDelete((snapshot) => {
    index.deleteObject(snapshot.id)
  });
