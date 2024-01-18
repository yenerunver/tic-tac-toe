import type { NextApiRequest, NextApiResponse } from "next";

import { getCountFromServer } from "@firebase/firestore";
import { deleteAllMoves, movesRef } from "@/components/firebase";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
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
}
