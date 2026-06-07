export type DeepSeekModelTier = 'pro' | 'flash';

// AI API配置
export const AI_CONFIG = {
  deepseek: {
    proxyPath: import.meta.env.VITE_AI_PROXY_PATH || '/api/ai/chat',
    models: {
      pro: import.meta.env.VITE_DEEPSEEK_PRO_MODEL || 'deepseek-v4pro',
      flash: import.meta.env.VITE_DEEPSEEK_FLASH_MODEL || 'deepseek-v4flash',
    },
  },
};

// 多 Agent 模型路由: 主力模型负责综合判断, 轻量模型负责结构化和局部计算。
export const MODEL_ROUTES = {
  deconstruction: 'pro',
  dialectical: 'pro',
  advancedReasoning: 'pro',
  probability: 'flash',
  timeline: 'flash',
  multidimensional: 'flash',
  risk: 'flash',
  finalReport: 'pro',
} satisfies Record<string, DeepSeekModelTier>;

// 判断是否使用模拟模式
export const USE_MOCK_AI = import.meta.env.VITE_USE_MOCK_AI === 'true';
