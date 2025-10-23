import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '../aiConfig';

// OpenAI客户端
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: AI_CONFIG.openai.apiKey,
      dangerouslyAllowBrowser: true, // 仅用于演示,生产环境应使用后端代理
    });
  }
  return openaiClient;
}

// Gemini客户端
let geminiClient: GoogleGenerativeAI | null = null;

export function getGeminiClient(): GoogleGenerativeAI {
  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(AI_CONFIG.gemini.apiKey);
  }
  return geminiClient;
}

/**
 * 调用OpenAI GPT-4
 */
export async function callOpenAI(prompt: string, systemPrompt?: string): Promise<string> {
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
    model: 'gpt-4-turbo-preview',
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
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ model: 'gemini-pro' });

  const fullPrompt = systemPrompt 
    ? `${systemPrompt}\n\n${prompt}`
    : prompt;

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

