import express from "express";
import { createServer as createHttpServer } from "http";
import { createServer as createViteServer } from "vite";
import { createDeepSeekChatCompletion, getDeepSeekRuntimeStatus } from "./ai";

async function startDevServer() {
  const app = express();
  const httpServer = createHttpServer(app);

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const result = await createDeepSeekChatCompletion(req.body);
      res.status(result.status).json(result.payload);
    } catch (error) {
      console.error("AI proxy failed:", error);
      res.status(500).json({ error: "AI proxy failed." });
    }
  });

  app.get("/api/ai/status", (_req, res) => {
    res.json(getDeepSeekRuntimeStatus());
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);

  const port = Number(process.env.PORT || 3000);

  httpServer.listen(port, () => {
    console.log(`Dev server running on http://localhost:${port}/`);
  });
}

startDevServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
