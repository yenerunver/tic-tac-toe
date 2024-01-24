import type { NextApiRequest, NextApiResponse } from "next";

import { postReset } from "@/components/service";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await postReset(req, res);
}
