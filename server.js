import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "10mb" }));

// Serve the built Vite app
const distDir = path.join(__dirname, "dist");
app.use(express.static(distDir));

// Gemini client (API key is injected at runtime in Cloud Run)
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not set. /api calls will fail.");
}
const ai = new GoogleGenAI({ apiKey });

// Minimal API endpoints so the frontend doesn't break
app.post("/api/generateRecipes", async (req, res) => {
  try {
    if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

    const input = req.body ?? {};
    const prompt = `Generate recipe ideas and one full recipe in JSON. Input:\n${JSON.stringify(input, null, 2)}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({ text: result.text ?? "" });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post("/api/generateIdeas", async (req, res) => {
  try {
    if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

    const input = req.body ?? {};
    const prompt = `Generate 5 quick meal ideas as JSON array. Input:\n${JSON.stringify(input, null, 2)}`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({ text: result.text ?? "" });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// SPA fallback
app.get("*", (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});

// IMPORTANT: Cloud Run listens on process.env.PORT
const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
