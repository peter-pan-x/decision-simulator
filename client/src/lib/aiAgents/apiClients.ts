import { AI_CONFIG, DeepSeekModelTier } from "../aiConfig";

type CallOptions = {
  tier?: DeepSeekModelTier;
  temperature?: number;
  maxTokens?: number;
};

let aiStatusCache: Promise<boolean> | null = null;

async function isDeepSeekConfigured(): Promise<boolean> {
  if (!aiStatusCache) {
    aiStatusCache = fetch("/api/ai/status")
      .then(response => (response.ok ? response.json() : null))
      .then(payload => Boolean(payload?.configured))
      .catch(() => false);
  }

  return aiStatusCache;
}

export async function callDeepSeek(
  prompt: string,
  systemPrompt?: string,
  options: CallOptions = {}
): Promise<string> {
  const tier = options.tier || "pro";

  if (!(await isDeepSeekConfigured())) {
    throw new Error("DeepSeek is not configured; using demo analysis.");
  }

  const response = await fetch(AI_CONFIG.deepseek.proxyPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      systemPrompt,
      tier,
      temperature: options.temperature,
      maxTokens: options.maxTokens,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error || "AI request failed.");
  }

  return payload?.content || "";
}

/**
 * Backward-compatible aliases for existing agents.
 * callOpenAI now means "high-reasoning DeepSeek v4pro".
 */
export async function callOpenAI(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  return callDeepSeek(prompt, systemPrompt, { tier: "pro" });
}

/**
 * Backward-compatible alias for existing agents.
 * callGemini now means "lightweight DeepSeek v4flash".
 */
export async function callGemini(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  return callDeepSeek(prompt, systemPrompt, { tier: "flash" });
}

/**
 * 解析JSON响应,处理可能的markdown代码块和模型解释性前后缀。
 */
export function parseJSONResponse(text: string): any {
  let cleaned = text.trim();

  cleaned = cleaned.replace(/^```json\s*/i, "");
  cleaned = cleaned.replace(/^```\s*/, "");
  cleaned = cleaned.replace(/\s*```$/, "");

  try {
    return JSON.parse(cleaned);
  } catch {
    const objectStart = cleaned.indexOf("{");
    const objectEnd = cleaned.lastIndexOf("}");
    const arrayStart = cleaned.indexOf("[");
    const arrayEnd = cleaned.lastIndexOf("]");

    const objectCandidate =
      objectStart !== -1 && objectEnd > objectStart
        ? cleaned.slice(objectStart, objectEnd + 1)
        : null;
    const arrayCandidate =
      arrayStart !== -1 && arrayEnd > arrayStart
        ? cleaned.slice(arrayStart, arrayEnd + 1)
        : null;

    for (const candidate of [objectCandidate, arrayCandidate]) {
      if (!candidate) continue;
      try {
        return JSON.parse(candidate);
      } catch {
        // Try the next candidate.
      }
    }

    console.error("Failed to parse JSON:", cleaned);
    throw new Error("Invalid JSON response from AI");
  }
}
