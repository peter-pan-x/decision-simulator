import {
  DecisionInput,
  DecisionStructure,
  TimelineSimulation,
  MultiDimensionalAnalysis,
  DimensionScore,
  Tradeoff,
  Synergy,
} from './types';
import { MODEL_ROUTES, USE_MOCK_AI } from '../aiConfig';

/**
 * AI Agent 4: 多维度评估专家
 * 使用 DeepSeek v4flash 进行深度的多维度分析
 */

export async function analyzeMultiDimensional(
  input: DecisionInput,
  structure: DecisionStructure,
  timeline: TimelineSimulation
): Promise<MultiDimensionalAnalysis> {
  if (USE_MOCK_AI) {
    return mockAnalyzeMultiDimensional(input, structure, timeline);
  }

  try {
    const { callDeepSeek, parseJSONResponse } = await import('./apiClients');
    const prompt = buildMultiDimensionalPrompt(input, structure, timeline);
    const systemPrompt = 'You are a multi-dimensional decision analysis expert. Respond with valid JSON only.';
    
    const response = await callDeepSeek(prompt, systemPrompt, {
      tier: MODEL_ROUTES.multidimensional,
      temperature: 0.35,
    });
    const parsed = parseJSONResponse(response);
    
    return {
      dimensions: parsed.dimensions || [],
      tradeoffs: parsed.tradeoffs || [],
      synergies: parsed.synergies || [],
    };
  } catch (error) {
    console.error('DeepSeek API failed, falling back to mock:', error);
    return mockAnalyzeMultiDimensional(input, structure, timeline);
  }
}

function buildMultiDimensionalPrompt(
  input: DecisionInput,
  structure: DecisionStructure,
  timeline: TimelineSimulation
): string {
  return `
You are a multi-dimensional decision analysis expert. Evaluate this decision across multiple dimensions.

Decision: ${input.question}
Dimensions to analyze: ${input.dimensions.join(', ')}

For each dimension, provide:
1. Score (0-100)
2. Trend (improving/stable/declining)
3. Detailed analysis
4. Sub-scores for specific aspects

Also identify:
- Trade-offs between dimensions
- Synergies where dimensions reinforce each other

Return structured JSON with dimensions, tradeoffs, and synergies.
`;
}

function mockAnalyzeMultiDimensional(
  input: DecisionInput,
  structure: DecisionStructure,
  timeline: TimelineSimulation
): MultiDimensionalAnalysis {
  const dimensions: DimensionScore[] = input.dimensions.map((dim) => {
    const baseScore = 50 + Math.random() * 40;
    const trend = baseScore > 70 ? 'improving' : baseScore < 40 ? 'declining' : 'stable';
    
    return {
      dimension: dim,
      score: Math.round(baseScore),
      trend: trend as 'improving' | 'stable' | 'declining',
      details: generateDimensionDetails(dim, baseScore),
      subScores: generateSubScores(dim),
    };
  });

  const tradeoffs: Tradeoff[] = generateTradeoffs(input.dimensions);
  const synergies: Synergy[] = generateSynergies(input.dimensions);

  return {
    dimensions,
    tradeoffs,
    synergies,
  };
}

function generateDimensionDetails(dimension: string, score: number): string {
  const quality = score > 70 ? 'strong positive' : score > 50 ? 'moderate positive' : score > 30 ? 'neutral' : 'concerning';
  
  const details: Record<string, string> = {
    financial: `Financial outlook shows ${quality} indicators. Income potential, expense management, and long-term wealth building are ${score > 60 ? 'favorable' : 'requiring attention'}.`,
    career: `Career trajectory demonstrates ${quality} momentum. Professional growth, skill development, and advancement opportunities are ${score > 60 ? 'promising' : 'limited'}.`,
    lifestyle: `Lifestyle quality reflects ${quality} conditions. Work-life balance, personal time, and daily satisfaction are ${score > 60 ? 'well-maintained' : 'under pressure'}.`,
    relationships: `Relationship dynamics show ${quality} patterns. Family bonds, friendships, and social connections are ${score > 60 ? 'thriving' : 'strained'}.`,
    health: `Health indicators present ${quality} status. Physical wellness, mental health, and stress levels are ${score > 60 ? 'optimal' : 'concerning'}.`,
    time: `Time management exhibits ${quality} efficiency. Available time, scheduling flexibility, and personal freedom are ${score > 60 ? 'abundant' : 'constrained'}.`,
  };

  return details[dimension] || `${dimension} shows ${quality} performance across key metrics.`;
}

function generateSubScores(dimension: string): Record<string, number> {
  const subScores: Record<string, Record<string, number>> = {
    financial: {
      income: 50 + Math.random() * 40,
      savings: 50 + Math.random() * 40,
      investments: 50 + Math.random() * 40,
      expenses: 50 + Math.random() * 40,
    },
    career: {
      growth: 50 + Math.random() * 40,
      skills: 50 + Math.random() * 40,
      network: 50 + Math.random() * 40,
      satisfaction: 50 + Math.random() * 40,
    },
    lifestyle: {
      balance: 50 + Math.random() * 40,
      hobbies: 50 + Math.random() * 40,
      leisure: 50 + Math.random() * 40,
      environment: 50 + Math.random() * 40,
    },
    relationships: {
      family: 50 + Math.random() * 40,
      friends: 50 + Math.random() * 40,
      romantic: 50 + Math.random() * 40,
      professional: 50 + Math.random() * 40,
    },
    health: {
      physical: 50 + Math.random() * 40,
      mental: 50 + Math.random() * 40,
      stress: 50 + Math.random() * 40,
      energy: 50 + Math.random() * 40,
    },
    time: {
      availability: 50 + Math.random() * 40,
      flexibility: 50 + Math.random() * 40,
      efficiency: 50 + Math.random() * 40,
      control: 50 + Math.random() * 40,
    },
  };

  return subScores[dimension] || {
    aspect1: 50 + Math.random() * 40,
    aspect2: 50 + Math.random() * 40,
  };
}

function generateTradeoffs(dimensions: string[]): Tradeoff[] {
  const tradeoffs: Tradeoff[] = [];
  
  const commonTradeoffs = [
    { dim1: 'financial', dim2: 'time', desc: 'Higher income often requires more time investment', severity: 0.7 },
    { dim1: 'career', dim2: 'lifestyle', desc: 'Career advancement may compromise work-life balance', severity: 0.6 },
    { dim1: 'financial', dim2: 'relationships', desc: 'Pursuing financial goals might strain personal relationships', severity: 0.5 },
    { dim1: 'career', dim2: 'health', desc: 'Career pressure can negatively impact health and wellness', severity: 0.6 },
    { dim1: 'time', dim2: 'financial', desc: 'More personal time may mean reduced earning potential', severity: 0.5 },
  ];

  for (const tradeoff of commonTradeoffs) {
    if (dimensions.includes(tradeoff.dim1) && dimensions.includes(tradeoff.dim2)) {
      tradeoffs.push({
        dimension1: tradeoff.dim1,
        dimension2: tradeoff.dim2,
        description: tradeoff.desc,
        severity: tradeoff.severity,
      });
    }
  }

  return tradeoffs;
}

function generateSynergies(dimensions: string[]): Synergy[] {
  const synergies: Synergy[] = [];
  
  const commonSynergies = [
    { 
      dims: ['health', 'lifestyle'], 
      desc: 'Good health and balanced lifestyle reinforce each other positively', 
      mult: 1.3 
    },
    { 
      dims: ['career', 'financial'], 
      desc: 'Career growth and financial success create a virtuous cycle', 
      mult: 1.4 
    },
    { 
      dims: ['relationships', 'health'], 
      desc: 'Strong relationships improve mental health and overall wellbeing', 
      mult: 1.25 
    },
    { 
      dims: ['time', 'lifestyle'], 
      desc: 'Time flexibility enhances lifestyle quality significantly', 
      mult: 1.35 
    },
  ];

  for (const synergy of commonSynergies) {
    if (synergy.dims.every(dim => dimensions.includes(dim))) {
      synergies.push({
        dimensions: synergy.dims,
        description: synergy.desc,
        multiplier: synergy.mult,
      });
    }
  }

  return synergies;
}
