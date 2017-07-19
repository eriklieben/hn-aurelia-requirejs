importScripts('scripts/firebase-app.js');
importScripts('scripts/firebase-database.js');

var db = firebase
  .initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
  .database()
  .ref('/v0');

onmessage = event => {
  if (event.data.message === 'hackernews:data:get') {
    getStories(event.data.type, event.data.page);
  }
};

function getStories(type, page) {
  db.child(`${type}stories`).once('value', snapshot => {
    const ids = snapshot.val();
    const start = (page - 1) * 30;
    const end = page * 30;
    const range = ids.slice(start, end);
    console.log('range length', range.length);
    const pages = Math.ceil(ids.length / 30);

    const promises = [];
    for (var id of range) {
      promises.push(new Promise((resolve, reject) => {
        this.db.child(`item/${id}`).once('value', snapshot => {
          resolve(snapshot.val());
        });
      }));
    }

    Promise.all(promises).then(data => {
      postMessage({
        message: 'hackernews:data:update',
        page: 'story-simple',
        pages: pages,
        type: type,
        items: data
      });
      postMessage({
        message: 'hackernews:data:done'
      });

    });


  });
}