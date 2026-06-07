import type { IncomingMessage, ServerResponse } from "http";
import { getDeepSeekRuntimeStatus } from "../../server/ai";

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(getDeepSeekRuntimeStatus()));
}
