import { NextApiRequest, NextApiResponse } from "next";
import {
  addDoc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "@firebase/firestore";
import { movesRef } from "@/components/firebase";

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
}
