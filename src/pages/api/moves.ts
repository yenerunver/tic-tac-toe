import type { NextApiRequest, NextApiResponse } from "next";

import { getDocs } from "@firebase/firestore";

import { movesRef } from "@/components/firebase";

type ResponseData = {
  moves?: object[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });

    return;
  }

  const moves: object[] = [];

  try {
    const querySnapshot = await getDocs(movesRef);

    querySnapshot.forEach((doc) => {
      moves.push(doc.data());
    });

    res.status(200).json({ moves });
  } catch (e) {
    res.status(400).send({ message: "Bad request!" });
  }
}
