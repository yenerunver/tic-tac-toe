import type { NextApiRequest, NextApiResponse } from "next";

import { DocumentData, getDocs } from "@firebase/firestore";
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

  const movesList: DocumentData[] = [];

  try {
    const querySnapshot = await getDocs(movesRef);

    querySnapshot.forEach((doc) => {
      movesList.push(doc.data());
    });

    res.status(200).json({ moves: movesList });
  } catch (e) {
    res.status(400).send({ message: "Bad request!" });
  }
}
