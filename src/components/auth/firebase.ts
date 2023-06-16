import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8khAk5PZnHmcKa-If2uFqvNbO2q-cVMI",
  authDomain: "fir-log-in-3b092.firebaseapp.com",
  projectId: "fir-log-in-3b092",
  storageBucket: "fir-log-in-3b092.appspot.com",
  messagingSenderId: "784143589085",
  appId: "1:784143589085:web:df3ff2da457d1044654534",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
