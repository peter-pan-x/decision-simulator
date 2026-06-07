import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { createDeepSeekChatCompletion, getDeepSeekRuntimeStatus } from "./ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

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

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
