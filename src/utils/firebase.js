import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseSignIn = async (email, password) => {
  try {
    const userSignIn = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return userSignIn;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const firebaseSignUp = async (email, password) => {
  try {
    const userSignUp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return userSignUp;
  } catch (err) {
    return err;
  }
};
