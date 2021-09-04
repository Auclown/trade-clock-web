import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FB_KEY,
  authDomain: process.env.REACT_APP_FB_DMN,
  databaseURL: process.env.REACT_APP_FB_DB_URL,
  projectId: process.env.REACT_APP_FB_PRJ_ID,
  storageBucket: process.env.REACT_APP_FB_STRG_BK,
  messagingSenderId: process.env.REACT_APP_FB_MSG_SNDR_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MSR_ID,
});

export const auth = app.auth();
export default app;
