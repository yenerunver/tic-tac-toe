import { NextApiRequest, NextApiResponse } from "next";
import { postMove } from "@/components/service";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await postMove(req, res);
}
