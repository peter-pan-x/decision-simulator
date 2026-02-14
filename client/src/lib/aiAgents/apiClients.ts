import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '../aiConfig';

// OpenAI客户端（仅在显式允许浏览器直连时使用）
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!AI_CONFIG.enableBrowserAI) {
    throw new Error('Browser AI is disabled. Use server proxy endpoint instead.');
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: AI_CONFIG.openai.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }
  return openaiClient;
}

// Gemini客户端（仅在显式允许浏览器直连时使用）
let geminiClient: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!AI_CONFIG.enableBrowserAI) {
    throw new Error('Browser AI is disabled. Use server proxy endpoint instead.');
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(AI_CONFIG.gemini.apiKey);
  }
  return geminiClient;
}

async function callProxy(provider: 'openai' | 'gemini', prompt: string, systemPrompt?: string) {
  const response = await fetch(`${AI_CONFIG.proxyBaseUrl}/${provider}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, systemPrompt }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Proxy request failed (${response.status}): ${errorText}`);
  }

  const payload = (await response.json()) as { text?: string };

  if (!payload.text) {
    throw new Error('Empty response from AI proxy');
  }

  return payload.text;
}

/**
 * 调用OpenAI GPT-4
 */
export async function callOpenAI(prompt: string, systemPrompt?: string): Promise<string> {
  if (!AI_CONFIG.enableBrowserAI) {
    return callProxy('openai', prompt, systemPrompt);
  }

  const client = getOpenAIClient();

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

  if (systemPrompt) {
    messages.push({
      role: 'system',
      content: systemPrompt,
    });
  }

  messages.push({
    role: 'user',
    content: prompt,
  });

  const response = await client.chat.completions.create({
    model: AI_CONFIG.openai.model,
    messages,
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || '';
}

/**
 * 调用Google Gemini
 */
export async function callGemini(prompt: string, systemPrompt?: string): Promise<string> {
  if (!AI_CONFIG.enableBrowserAI) {
    return callProxy('gemini', prompt, systemPrompt);
  }

  const client = getGeminiClient();
  const model = client.getGenerativeModel({ model: AI_CONFIG.gemini.model });

  const fullPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  return response.text();
}

/**
 * 解析JSON响应,处理可能的markdown代码块
 */
export function parseJSONResponse(text: string): any {
  // 移除可能的markdown代码块标记
  let cleaned = text.trim();

  // 移除 ```json 和 ```
  cleaned = cleaned.replace(/^```json\s*/i, '');
  cleaned = cleaned.replace(/^```\s*/, '');
  cleaned = cleaned.replace(/\s*```$/, '');

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse JSON:', cleaned);
    throw new Error('Invalid JSON response from AI');
  }
}
