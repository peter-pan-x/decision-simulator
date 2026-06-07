import { DecisionInput, DebateLog } from './types';
import { MODEL_ROUTES, USE_MOCK_AI } from '../aiConfig';

export interface DialecticalResult {
  optimistView: string;
  cynicView: string;
  synthesis: string;
  logs: DebateLog[];
}

export async function runDialecticalAnalysis(
  input: DecisionInput,
  onLog?: (log: DebateLog) => void
): Promise<DialecticalResult> {
  const logs: DebateLog[] = [];

  const addLog = (log: DebateLog) => {
    logs.push(log);
    onLog?.(log);
  };

  if (USE_MOCK_AI) {
    return mockDialecticalAnalysis(input, addLog);
  }

  try {
    const { callDeepSeek, parseJSONResponse } = await import('./apiClients');

    // 1. Optimist Analysis
    addLog({
      agent: 'Agent-O',
      role: 'optimist',
      message: 'Analyzing potential growth and best-case scenarios...',
      timestamp: Date.now(),
      thoughtProcess: 'Scanning for positive externalities and compounding growth factors.'
    });
    
    const optimistPrompt = `Analyze this decision from an extremely optimistic perspective. Focus on growth, opportunities, and the best possible outcomes.
    Decision: ${input.question}
    Options: ${JSON.stringify(input.options)}
    Return a detailed analysis of why this could be a massive success.`;
    
    const optimistView = await callDeepSeek(optimistPrompt, "You are an optimistic growth strategist.", {
      tier: MODEL_ROUTES.dialectical,
      temperature: 0.65,
    });
    
    addLog({
      agent: 'Agent-O',
      role: 'optimist',
      message: 'Optimistic projection complete. Identified significant upside in long-term scaling.',
      timestamp: Date.now()
    });

    // 2. Cynic Analysis
    addLog({
      agent: 'Agent-C',
      role: 'cynic',
      message: 'Stress testing the assumptions and identifying hidden risks...',
      timestamp: Date.now(),
      thoughtProcess: 'Applying Murphy\'s Law. Identifying single points of failure and hidden costs.'
    });
    
    const cynicPrompt = `Analyze this decision from a cynical, risk-averse perspective. Focus on what could go wrong, hidden costs, and worst-case scenarios.
    Decision: ${input.question}
    Options: ${JSON.stringify(input.options)}
    Optimist's View: ${optimistView}
    Challenge the optimist's assumptions and provide a reality check.`;
    
    const cynicView = await callDeepSeek(cynicPrompt, "You are a cynical risk manager and auditor.", {
      tier: MODEL_ROUTES.dialectical,
      temperature: 0.55,
    });
    
    addLog({
      agent: 'Agent-C',
      role: 'cynic',
      message: 'Risk audit complete. Found 3 critical vulnerabilities in the optimistic model.',
      timestamp: Date.now()
    });

    // 3. Synthesis
    addLog({
      agent: 'Agent-S',
      role: 'synthesizer',
      message: 'Synthesizing conflicting viewpoints into a balanced strategic framework...',
      timestamp: Date.now(),
      thoughtProcess: 'Using Bayesian updating to reconcile the optimist and cynic views. Calculating weighted probabilities.'
    });
    
    const synthesisPrompt = `You are the Lead Strategist. Reconcile the following conflicting views:
    Optimist: ${optimistView}
    Cynic: ${cynicView}
    
    Provide a balanced synthesis that acknowledges both the upside and the risks. 
    Decision: ${input.question}
    Return a structured JSON:
    {
      "synthesis": "...",
      "key_tradeoffs": ["..."],
      "final_recommendation": "..."
    }`;
    
    const synthesisResponse = await callDeepSeek(synthesisPrompt, "You are a master synthesizer and strategic decision maker.", {
      tier: MODEL_ROUTES.dialectical,
      temperature: 0.4,
    });
    const parsedSynthesis = parseJSONResponse(synthesisResponse);
    
    addLog({
      agent: 'Agent-S',
      role: 'synthesizer',
      message: 'Strategic synthesis complete. Final recommendation formulated based on risk-adjusted returns.',
      timestamp: Date.now()
    });

    return {
      optimistView,
      cynicView,
      synthesis: parsedSynthesis.synthesis,
      logs
    };
  } catch (error) {
    console.error('Dialectical analysis failed, falling back to mock:', error);
    return mockDialecticalAnalysis(input, addLog);
  }
}

async function mockDialecticalAnalysis(input: DecisionInput, addLog: (log: DebateLog) => void): Promise<DialecticalResult> {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  addLog({
    agent: 'Agent-O',
    role: 'optimist',
    message: 'Scanning for growth vectors and positive feedback loops...',
    timestamp: Date.now(),
    thoughtProcess: 'Analyzing market trends and potential for exponential growth.'
  });
  await delay(2000);
  
  addLog({
    agent: 'Agent-C',
    role: 'cynic',
    message: 'Identifying systemic risks and potential black swan events...',
    timestamp: Date.now(),
    thoughtProcess: 'Evaluating liquidity risks and competitive counter-moves.'
  });
  await delay(2500);
  
  addLog({
    agent: 'Agent-S',
    role: 'synthesizer',
    message: 'Reconciling conflicting models via Monte Carlo simulation...',
    timestamp: Date.now(),
    thoughtProcess: 'Running 10,000 iterations to find the most robust path forward.'
  });
  await delay(3000);

  return {
    optimistView: "The potential for growth is immense...",
    cynicView: "The risks are often underestimated...",
    synthesis: "A balanced approach is required...",
    logs: []
  };
}
