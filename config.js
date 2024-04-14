const firebase = require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyCL8pUOlAL8i-gyWFW6jhjd2wYqyiQUKZA",
  authDomain: "twoo-77302.firebaseapp.com",
  databaseURL: "https://twoo-77302-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "twoo-77302",
  storageBucket: "twoo-77302.appspot.com",
  messagingSenderId: "135447477359",
  appId: "1:135447477359:web:8acc4c56ab1e7714c4e19a",
  measurementId: "G-WKRKWCHRWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider();
const db = getDatabase(app);


// firebase.initializeApp(firebaseConfig)
// let db = firebase.database()



// export {db};
module.exports = db;