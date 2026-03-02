// AI API配置
export const AI_CONFIG = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'mock-openai-key',
    model: 'gpt-4o',
    baseURL: import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1',
  },
  claude: {
    apiKey: import.meta.env.VITE_CLAUDE_API_KEY || 'mock-claude-key',
    model: 'claude-3-5-sonnet-20240620',
    baseURL: 'https://api.anthropic.com/v1',
  },
  gemini: {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'mock-gemini-key',
    model: 'gemini-pro',
    baseURL: 'https://generativelanguage.googleapis.com/v1',
  },
};

// 判断是否使用模拟模式
export const USE_MOCK_AI = 
  AI_CONFIG.openai.apiKey === 'mock-openai-key' ||
  AI_CONFIG.claude.apiKey === 'mock-claude-key' ||
  AI_CONFIG.gemini.apiKey === 'mock-gemini-key';

