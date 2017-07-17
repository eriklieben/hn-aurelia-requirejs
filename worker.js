importScripts('scripts/firebase-app.js');
importScripts('scripts/firebase-database.js');

var db = firebase
  .initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
  .database()
  .ref('/v0');

onmessage = event => {
  console.log('from worker', event);
  if (event.data.message === 'hackernews:data:get') {
    getStories(event.data.type);
  }
};

function getStories(type) {
  db.child(`${type}stories`).once('value', snapshot => {
    const items = snapshot.val();
    for (var id of items) {
      this.db.child(`item/${id}`).once('value', snapshot => {
        const item = snapshot.val();
        postMessage({
          message: 'hackernews:data:update',
          page: 'story-simple',
          type: type,
          item: item
        });
      });
    }
    postMessage({
      message: 'hackernews:data:done'
    });
  });
}




// db.child('newstories').on('value', snapshot => {
//   const items = snapshot.val();
//   postMessage({
//     page: 'new',
//     items: items
//   });
// });

// db.child('showstories').on('value', snapshot => {
//   const items = snapshot.val();
//   postMessage({
//     page: 'show',
//     items: items
//   });
// });

// db.child('askstories').on('value', snapshot => {
//   const items = snapshot.val();
//   postMessage({
//     page: 'ask',
//     items: items
//   });
// });

// db.child('jobstories').on('value', snapshot => {
//   const items = snapshot.val();
//   postMessage({
//     page: 'job',
//     items: items
//   });
// });