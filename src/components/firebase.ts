import { initializeApp } from "@firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const movesRef = collection(db, "moves");

const addMove = async (username: string, sign: string, square: number) => {
  await addDoc(movesRef, {
    username,
    sign,
    square,
    timestamp: Date.now(),
  });
};

const getAllMoves = async () => {
  const allMoves = (await getDocs(movesRef)).docs.map((entry) => entry.data());
  allMoves.sort((a, b) => a.timestamp - b.timestamp);

  return allMoves;
};

const deleteAllMoves = async () => {
  const allEntries = await getDocs(query(movesRef));
  allEntries.forEach((entry) => deleteDoc(doc(db, "moves", entry.id)));
};

export { app, db, movesRef, addMove, getAllMoves, deleteAllMoves };
