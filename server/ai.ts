export type ModelTier = 'pro' | 'flash';

type ChatRequest = {
  prompt: string;
  systemPrompt?: string;
  tier?: ModelTier;
  temperature?: number;
  maxTokens?: number;
};

const DEFAULT_BASE_URL = 'https://api.deepseek.com/v1';
const DEFAULT_MODELS: Record<ModelTier, string> = {
  pro: 'deepseek-v4pro',
  flash: 'deepseek-v4flash',
};

function getModelName(tier: ModelTier) {
  return tier === 'pro'
    ? process.env.DEEPSEEK_PRO_MODEL || DEFAULT_MODELS.pro
    : process.env.DEEPSEEK_FLASH_MODEL || DEFAULT_MODELS.flash;
}

export async function createDeepSeekChatCompletion(body: ChatRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseURL = process.env.DEEPSEEK_BASE_URL || DEFAULT_BASE_URL;
  const tier = body.tier || 'pro';

  if (!apiKey) {
    return {
      status: 503,
      payload: {
        error: 'DEEPSEEK_API_KEY is not configured on the server.',
      },
    };
  }

  if (!body.prompt || typeof body.prompt !== 'string') {
    return {
      status: 400,
      payload: {
        error: 'A non-empty prompt is required.',
      },
    };
  }

  const messages = [
    ...(body.systemPrompt ? [{ role: 'system', content: body.systemPrompt }] : []),
    { role: 'user', content: body.prompt },
  ];

  const response = await fetch(`${baseURL.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: getModelName(tier),
      messages,
      temperature: body.temperature ?? (tier === 'pro' ? 0.55 : 0.35),
      max_tokens: body.maxTokens ?? (tier === 'pro' ? 3000 : 1800),
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      status: response.status,
      payload: {
        error: payload?.error?.message || payload?.message || 'DeepSeek request failed.',
      },
    };
  }

  return {
    status: 200,
    payload: {
      content: payload?.choices?.[0]?.message?.content || '',
      model: getModelName(tier),
      tier,
    },
  };
}

export function getDeepSeekRuntimeStatus() {
  const configured = Boolean(process.env.DEEPSEEK_API_KEY);

  return {
    configured,
    provider: 'DeepSeek',
    baseURL: process.env.DEEPSEEK_BASE_URL || DEFAULT_BASE_URL,
    models: {
      pro: getModelName('pro'),
      flash: getModelName('flash'),
    },
  };
}
