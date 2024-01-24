import { Response } from "firebase-functions";
import { Request } from "firebase-functions/v2/https";
import { NextApiRequest, NextApiResponse } from "next";
import { getCountFromServer } from "@firebase/firestore";
import { addMove, deleteAllMoves, getAllMoves, movesRef } from "./firebase";

export const postMove = async (
  req: Request | NextApiRequest,
  res: Response<any> | NextApiResponse<{ message: string }>,
) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });

    return;
  }

  const allMoves = await getAllMoves();

  if (allMoves.length >= 9) {
    res.status(400).send({ message: "Too many data!" });

    return;
  }

  const { body } = req;

  if (body.auth !== process.env.NEXT_PUBLIC_FIREBASE_API_AUTH) {
    res.status(401).send({ message: "Unauthorized!" });

    return;
  }

  if (!body.username || !body.sign || Number.isNaN(body.square)) {
    res.status(400).send({ message: "Bad request!" });

    return;
  }

  const latestEntry = allMoves[allMoves.length - 1] || null;

  if (latestEntry && latestEntry.sign === body.sign) {
    res.status(400).send({ message: "Bad request!" });

    return;
  }

  if (
    allMoves.filter((moveEntry) => moveEntry.square === body.square).length > 0
  ) {
    res.status(400).send({ message: "Duplicate entry!" });

    return;
  }

  await addMove(body.username, body.sign, body.square);

  res.status(200).json({ message: `OK!` });
};

export const postReset = async (
  req: Request | NextApiRequest,
  res: Response<any> | NextApiResponse<{ message: string }>,
) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });

    return;
  }

  const { body } = req;

  if (body.auth !== process.env.NEXT_PUBLIC_FIREBASE_API_AUTH) {
    res.status(401).send({ message: "Unauthorized!" });

    return;
  }

  const countSnapshot = await getCountFromServer(movesRef);

  if (countSnapshot.data().count === 0) {
    res.status(400).send({ message: "Bad request!" });

    return;
  }

  await deleteAllMoves();

  res.status(200).json({ message: `OK!` });
};
