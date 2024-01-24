import { onRequest } from "firebase-functions/v2/https";

import { postMove, postReset } from "../components/service";

const move = onRequest(
  { cors: ["http://localhost:3000", "https://localhost"] },
  async (req, res) => {
    await postMove(req, res);
  },
);

const reset = onRequest(
  { cors: ["http://localhost:3000", "https://localhost"] },
  async (req, res) => {
    await postReset(req, res);
  },
);

export { move, reset };
