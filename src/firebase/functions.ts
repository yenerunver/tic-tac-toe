import { onRequest } from "firebase-functions/v2/https";

import {
  addDoc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";
import { deleteAllMoves, movesRef } from "../components/firebase";

const move = onRequest(
  { cors: ["http://localhost:3000", "https://localhost"] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests are allowed" });

      return;
    }

    const countSnapshot = await getCountFromServer(movesRef);

    if (countSnapshot.data().count >= 9) {
      res.status(400).send({ message: "Bad request!" });

      return;
    }

    const { body } = req;

    if (!body.username || !body.sign || Number.isNaN(body.square)) {
      res.status(400).send({ message: "Bad request!" });

      return;
    }

    const latestEntrySnapshot = await getDocs(
      query(movesRef, orderBy("timestamp", "desc"), limit(1)),
    );
    latestEntrySnapshot.forEach((entry) => {
      if (entry.data().sign === body.sign) {
        res.status(400).send({ message: "Bad request!" });
      }
    });

    await addDoc(movesRef, {
      username: body.username,
      sign: body.sign,
      square: body.square,
      timestamp: Date.now(),
    });

    res.status(200).json({ message: `OK!` });
  },
);

const moves = onRequest(
  { cors: ["http://localhost:3000", "https://localhost"] },
  async (req, res) => {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed" });

      return;
    }

    const movesList: object[] = [];

    try {
      const querySnapshot = await getDocs(movesRef);

      querySnapshot.forEach((doc) => {
        movesList.push(doc.data());
      });

      res.status(200).json({ moves: movesList });
    } catch (e) {
      res.status(400).send({ message: "Bad request!" });
    }
  },
);

const reset = onRequest(
  { cors: ["http://localhost:3000", "https://localhost"] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });

      return;
    }

    const countSnapshot = await getCountFromServer(movesRef);

    if (countSnapshot.data().count === 0) {
      res.status(400).send({ message: "Bad request!" });

      return;
    }

    await deleteAllMoves();

    res.status(200).json({ message: `OK!` });
  },
);

export { move, moves, reset };
