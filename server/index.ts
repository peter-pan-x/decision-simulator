import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/ai/openai", async (req, res) => {
    try {
      const { prompt, systemPrompt } = req.body as { prompt?: string; systemPrompt?: string };
      if (!prompt) {
        return res.status(400).json({ error: "Missing prompt" });
      }

      const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "OPENAI_API_KEY is not configured on server" });
      }

      const client = new OpenAI({ apiKey });
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
      }
      messages.push({ role: "user", content: prompt });

      const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4-turbo-preview",
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      });

      return res.json({ text: response.choices[0]?.message?.content || "" });
    } catch (error) {
      console.error("OpenAI proxy error:", error);
      return res.status(500).json({ error: "OpenAI proxy request failed" });
    }
  });

  app.post("/api/ai/gemini", async (req, res) => {
    try {
      const { prompt, systemPrompt } = req.body as { prompt?: string; systemPrompt?: string };
      if (!prompt) {
        return res.status(400).json({ error: "Missing prompt" });
      }

      const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on server" });
      }

      const gemini = new GoogleGenerativeAI(apiKey);
      const model = gemini.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-pro" });
      const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;

      return res.json({ text: response.text() });
    } catch (error) {
      console.error("Gemini proxy error:", error);
      return res.status(500).json({ error: "Gemini proxy request failed" });
    }
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

  const port = process.env.PORT || (process.env.NODE_ENV === "production" ? 3000 : 3001);

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
