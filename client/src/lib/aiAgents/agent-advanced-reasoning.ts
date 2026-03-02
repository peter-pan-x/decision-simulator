import { DecisionInput, DecisionStructure, DebateLog } from './types';
import { callOpenAI, parseJSONResponse } from './apiClients';
import { USE_MOCK_AI } from '../aiConfig';

export interface GameTheoryAnalysis {
  payoffMatrix: Record<string, Record<string, number>>;
  nashEquilibrium: string;
  strategicInsights: string[];
  logs: DebateLog[];
}

export interface ScenarioAnalysis {
  scenarios: Array<{
    name: string;
    probability: number;
    description: string;
    implications: string[];
  }>;
  logs: DebateLog[];
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 博弈论分析：模拟不同选择的相互作用
 */
export async function analyzeGameTheory(
  input: DecisionInput,
  decisionStructure: DecisionStructure,
  onLog?: (log: DebateLog) => void
): Promise<GameTheoryAnalysis> {
  const logs: DebateLog[] = [];

  const addLog = (log: DebateLog) => {
    logs.push(log);
    onLog?.(log);
  };

  if (USE_MOCK_AI) {
    return mockGameTheoryAnalysis(input, addLog);
  }

  try {
    addLog({
      agent: 'Game-Theorist',
      role: 'synthesizer',
      message: 'Analyzing strategic interactions and competitive dynamics...',
      timestamp: Date.now(),
      thoughtProcess: 'Building payoff matrices for each option pair.'
    });

    const prompt = `Analyze the strategic game theory implications of these options:
    Decision: ${input.question}
    Options: ${JSON.stringify(input.options)}
    Variables: ${JSON.stringify(decisionStructure.variables.map(v => v.name))}
    
    Create a game theory analysis:
    1. Build a payoff matrix for each option pair
    2. Identify Nash equilibrium
    3. Provide strategic insights
    
    Return JSON:
    {
      "payoffMatrix": {...},
      "nashEquilibrium": "...",
      "strategicInsights": ["..."]
    }`;

    const response = await callOpenAI(prompt, "You are a game theory expert analyzing strategic decisions.");
    const parsed = parseJSONResponse(response);

    addLog({
      agent: 'Game-Theorist',
      role: 'synthesizer',
      message: `Nash Equilibrium identified: ${parsed.nashEquilibrium}`,
      timestamp: Date.now()
    });

    return {
      payoffMatrix: parsed.payoffMatrix || {},
      nashEquilibrium: parsed.nashEquilibrium || 'Mixed strategy',
      strategicInsights: parsed.strategicInsights || [],
      logs
    };
  } catch (error) {
    console.error('Game theory analysis failed:', error);
    return mockGameTheoryAnalysis(input, addLog);
  }
}

/**
 * 高级情景分析：生成多个可能的未来情景
 */
export async function analyzeAdvancedScenarios(
  input: DecisionInput,
  decisionStructure: DecisionStructure,
  onLog?: (log: DebateLog) => void
): Promise<ScenarioAnalysis> {
  const logs: DebateLog[] = [];

  const addLog = (log: DebateLog) => {
    logs.push(log);
    onLog?.(log);
  };

  if (USE_MOCK_AI) {
    return mockAdvancedScenarios(input, addLog);
  }

  try {
    addLog({
      agent: 'Futurist',
      role: 'futurist',
      message: 'Generating alternative future scenarios...',
      timestamp: Date.now(),
      thoughtProcess: 'Considering black swan events, exponential growth, and systemic shifts.'
    });

    await delay(2000);

    const prompt = `Generate 5 distinct future scenarios for this decision:
    Decision: ${input.question}
    Options: ${JSON.stringify(input.options)}
    Timeframe: ${input.timeframe}
    
    For each scenario:
    1. Give it a compelling name
    2. Estimate probability (0-1)
    3. Describe the future state
    4. List implications for each option
    
    Consider:
    - Black swan events
    - Exponential growth/decline
    - Systemic shifts
    - Regulatory changes
    
    Return JSON:
    {
      "scenarios": [
        {
          "name": "...",
          "probability": 0.2,
          "description": "...",
          "implications": ["..."]
        }
      ]
    }`;

    const response = await callOpenAI(prompt, "You are a futurist and scenario planner.");
    const parsed = parseJSONResponse(response);

    addLog({
      agent: 'Futurist',
      role: 'futurist',
      message: `Generated ${parsed.scenarios?.length || 5} distinct future scenarios.`,
      timestamp: Date.now()
    });

    return {
      scenarios: parsed.scenarios || [],
      logs
    };
  } catch (error) {
    console.error('Advanced scenario analysis failed:', error);
    return mockAdvancedScenarios(input, addLog);
  }
}

/**
 * 深度因果链分析：追踪复杂的因果关系链
 */
export async function analyzeCausalChains(
  input: DecisionInput,
  decisionStructure: DecisionStructure,
  onLog?: (log: DebateLog) => void
): Promise<{ chains: string[][]; logs: DebateLog[] }> {
  const logs: DebateLog[] = [];

  const addLog = (log: DebateLog) => {
    logs.push(log);
    onLog?.(log);
  };

  if (USE_MOCK_AI) {
    return mockCausalChains(input, addLog);
  }

  try {
    addLog({
      agent: 'Causal-Analyst',
      role: 'synthesizer',
      message: 'Tracing deep causal chains and second-order effects...',
      timestamp: Date.now(),
      thoughtProcess: 'Following causal links through 5+ levels of indirection.'
    });

    await delay(2500);

    const prompt = `Analyze the deep causal chains for this decision:
    Decision: ${input.question}
    Options: ${JSON.stringify(input.options)}
    Causal Links: ${JSON.stringify(decisionStructure.causalLinks)}
    
    For each option, trace causal chains 5+ levels deep:
    1. Start with direct effects
    2. Follow to second-order effects
    3. Continue to tertiary and quaternary effects
    4. Identify feedback loops
    5. Find non-obvious long-term consequences
    
    Return JSON:
    {
      "chains": [
        ["effect1", "effect2", "effect3", "effect4", "effect5"]
      ]
    }`;

    const response = await callOpenAI(prompt, "You are a systems analyst expert in causal reasoning.");
    const parsed = parseJSONResponse(response);

    addLog({
      agent: 'Causal-Analyst',
      role: 'synthesizer',
      message: `Identified ${parsed.chains?.length || 0} deep causal chains with feedback loops.`,
      timestamp: Date.now()
    });

    return {
      chains: parsed.chains || [],
      logs
    };
  } catch (error) {
    console.error('Causal chain analysis failed:', error);
    return mockCausalChains(input, addLog);
  }
}

// Mock implementations
async function mockGameTheoryAnalysis(input: DecisionInput, addLog: (log: DebateLog) => void): Promise<GameTheoryAnalysis> {
  await delay(2000);
  
  addLog({
    agent: 'Game-Theorist',
    role: 'synthesizer',
    message: 'Analyzing strategic interactions between options...',
    timestamp: Date.now()
  });

  await delay(1500);

  addLog({
    agent: 'Game-Theorist',
    role: 'synthesizer',
    message: 'Nash Equilibrium: Mixed strategy with 60% allocation to Option 1.',
    timestamp: Date.now()
  });

  return {
    payoffMatrix: {
      'Option1-Option2': { 'Option1': 75, 'Option2': 65 },
      'Option1-Option3': { 'Option1': 70, 'Option3': 60 }
    },
    nashEquilibrium: 'Mixed strategy equilibrium',
    strategicInsights: [
      'Option 1 dominates in most pairwise comparisons',
      'Option 2 provides insurance against downside risk',
      'Optimal strategy involves portfolio approach'
    ],
    logs: []
  };
}

async function mockAdvancedScenarios(input: DecisionInput, addLog: (log: DebateLog) => void): Promise<ScenarioAnalysis> {
  await delay(3000);

  addLog({
    agent: 'Futurist',
    role: 'futurist',
    message: 'Scenario 1: Exponential growth trajectory identified.',
    timestamp: Date.now()
  });

  await delay(1500);

  addLog({
    agent: 'Futurist',
    role: 'futurist',
    message: 'Scenario 2: Black swan event - market disruption.',
    timestamp: Date.now()
  });

  await delay(1500);

  addLog({
    agent: 'Futurist',
    role: 'futurist',
    message: 'Scenario 3: Regulatory shift - new compliance requirements.',
    timestamp: Date.now()
  });

  return {
    scenarios: [
      {
        name: 'Exponential Growth',
        probability: 0.25,
        description: 'Market conditions favor rapid expansion and scaling.',
        implications: ['Option 1 scales best', 'High capital requirements', 'Competitive advantage widens']
      },
      {
        name: 'Market Stagnation',
        probability: 0.35,
        description: 'Economic slowdown limits growth opportunities.',
        implications: ['Option 2 provides stability', 'Cost control becomes critical', 'Diversification valuable']
      },
      {
        name: 'Regulatory Disruption',
        probability: 0.20,
        description: 'New regulations reshape the competitive landscape.',
        implications: ['Compliance costs rise', 'Barriers to entry increase', 'Consolidation likely']
      },
      {
        name: 'Technological Disruption',
        probability: 0.15,
        description: 'New technology makes current approach obsolete.',
        implications: ['Existing advantages disappear', 'First-mover advantage critical', 'Flexibility essential']
      },
      {
        name: 'Geopolitical Crisis',
        probability: 0.05,
        description: 'Major geopolitical event disrupts markets.',
        implications: ['Risk management paramount', 'Geographic diversification critical', 'Liquidity essential']
      }
    ],
    logs: []
  };
}

async function mockCausalChains(input: DecisionInput, addLog: (log: DebateLog) => void): Promise<{ chains: string[][]; logs: DebateLog[] }> {
  await delay(2500);

  addLog({
    agent: 'Causal-Analyst',
    role: 'synthesizer',
    message: 'Tracing causal chain: Decision → Immediate Effect → Secondary Effect...',
    timestamp: Date.now()
  });

  await delay(2000);

  addLog({
    agent: 'Causal-Analyst',
    role: 'synthesizer',
    message: 'Identified 4 major feedback loops with amplification effects.',
    timestamp: Date.now()
  });

  return {
    chains: [
      ['Higher Income', 'Increased Financial Security', 'Reduced Stress', 'Better Health', 'Increased Productivity', 'Career Advancement'],
      ['Career Growth', 'Skill Development', 'Market Value Increase', 'Salary Growth', 'Financial Stability'],
      ['Work-Life Balance', 'Family Relationships', 'Social Support', 'Stress Reduction', 'Mental Health'],
      ['Location Change', 'Social Network Reset', 'Relationship Strain', 'Stress Increase', 'Performance Decline']
    ],
    logs: []
  };
}
