// AI API配置
export const AI_CONFIG = {
  useMockAI: import.meta.env.VITE_USE_MOCK_AI === 'true',
  enableBrowserAI: import.meta.env.VITE_ENABLE_BROWSER_AI === 'true',
  proxyBaseUrl: import.meta.env.VITE_AI_PROXY_URL || '/api/ai',
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'mock-openai-key',
    model: 'gpt-4-turbo-preview',
    baseURL: 'https://api.openai.com/v1',
  },
  claude: {
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY || 'mock-claude-key',
    model: 'claude-3-opus-20240229',
    baseURL: 'https://api.anthropic.com/v1',
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'mock-gemini-key',
    model: 'gemini-pro',
    baseURL: 'https://generativelanguage.googleapis.com/v1',
  },
};

// 判断是否使用模拟模式（仅在显式开关，或核心Provider都未配置时启用）
const hasOpenAIKey = AI_CONFIG.openai.apiKey !== 'mock-openai-key';
const hasGeminiKey = AI_CONFIG.gemini.apiKey !== 'mock-gemini-key';

export const USE_MOCK_AI = AI_CONFIG.useMockAI || (!hasOpenAIKey && !hasGeminiKey);
