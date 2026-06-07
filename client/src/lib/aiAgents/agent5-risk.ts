import {
  DecisionInput,
  DecisionStructure,
  TimelineSimulation,
  RiskAnalysis,
  Risk,
  Uncertainty,
  MitigationStrategy,
  Scenario,
} from './types';
import { MODEL_ROUTES, USE_MOCK_AI } from '../aiConfig';

/**
 * AI Agent 5: 风险与不确定性分析师
 * 使用 DeepSeek v4flash 进行深度风险评估
 */

export async function analyzeRisks(
  input: DecisionInput,
  structure: DecisionStructure,
  timeline: TimelineSimulation
): Promise<RiskAnalysis> {
  if (USE_MOCK_AI) {
    return mockAnalyzeRisks(input, structure, timeline);
  }

  try {
    const { callDeepSeek, parseJSONResponse } = await import('./apiClients');
    const prompt = buildRiskPrompt(input, structure, timeline);
    const systemPrompt = 'You are a risk analysis expert. Respond with valid JSON only.';
    
    const response = await callDeepSeek(prompt, systemPrompt, {
      tier: MODEL_ROUTES.risk,
      temperature: 0.3,
    });
    const parsed = parseJSONResponse(response);
    
    return {
      risks: parsed.risks || [],
      uncertainties: parsed.uncertainties || [],
      mitigationStrategies: parsed.mitigationStrategies || [],
      worstCaseScenario: parsed.worstCaseScenario || { description: '', probability: 0, triggers: [], consequences: [] },
    };
  } catch (error) {
    console.error('DeepSeek API failed, falling back to mock:', error);
    return mockAnalyzeRisks(input, structure, timeline);
  }
}

function buildRiskPrompt(
  input: DecisionInput,
  structure: DecisionStructure,
  timeline: TimelineSimulation
): string {
  return `
You are a risk analysis expert. Identify and quantify all risks and uncertainties.

Decision: ${input.question}
Risk Profile: ${input.riskProfile}
Timeframe: ${input.timeframe}

Analyze:
1. All potential risks (financial, career, health, relationship, etc.)
2. Probability and impact of each risk
3. Key uncertainties and their ranges
4. Worst-case scenario triggers and consequences
5. Mitigation strategies for high-priority risks

Return structured JSON with risks, uncertainties, mitigation strategies, and worst-case scenario.
`;
}

function mockAnalyzeRisks(
  input: DecisionInput,
  structure: DecisionStructure,
  timeline: TimelineSimulation
): RiskAnalysis {
  const risks: Risk[] = generateRisks(input, structure);
  const uncertainties: Uncertainty[] = generateUncertainties(structure);
  const mitigationStrategies: MitigationStrategy[] = generateMitigationStrategies(risks);
  const worstCaseScenario: Scenario = generateWorstCase(input, risks);

  return {
    risks,
    uncertainties,
    mitigationStrategies,
    worstCaseScenario,
  };
}

function generateRisks(input: DecisionInput, structure: DecisionStructure): Risk[] {
  const isJobDecision = input.question.toLowerCase().includes('job') || 
                        input.question.toLowerCase().includes('work');
  
  if (isJobDecision) {
    return [
      {
        id: 'risk_1',
        type: 'career',
        description: 'New company culture may not align with personal values and work style',
        probability: 0.35,
        impact: 7,
        severity: 'high',
        timeframe: '3-6 months',
      },
      {
        id: 'risk_2',
        type: 'financial',
        description: 'Higher cost of living in new location could offset salary increase',
        probability: 0.45,
        impact: 6,
        severity: 'medium',
        timeframe: '1-3 months',
      },
      {
        id: 'risk_3',
        type: 'relationship',
        description: 'Distance from family and friends may lead to isolation and loneliness',
        probability: 0.50,
        impact: 8,
        severity: 'high',
        timeframe: '6-12 months',
      },
      {
        id: 'risk_4',
        type: 'career',
        description: 'Promised growth opportunities may not materialize as expected',
        probability: 0.30,
        impact: 7,
        severity: 'medium',
        timeframe: '1-2 years',
      },
      {
        id: 'risk_5',
        type: 'health',
        description: 'Increased stress and pressure in new role could affect mental health',
        probability: 0.40,
        impact: 8,
        severity: 'high',
        timeframe: '3-9 months',
      },
      {
        id: 'risk_6',
        type: 'other',
        description: 'Economic downturn could lead to layoffs in new company',
        probability: 0.15,
        impact: 9,
        severity: 'critical',
        timeframe: '1-3 years',
      },
    ];
  }

  // 通用风险
  return [
    {
      id: 'risk_1',
      type: 'other',
      description: 'Unexpected obstacles may arise during implementation',
      probability: 0.40,
      impact: 6,
      severity: 'medium',
      timeframe: 'Short-term',
    },
    {
      id: 'risk_2',
      type: 'financial',
      description: 'Financial costs may exceed initial estimates',
      probability: 0.35,
      impact: 7,
      severity: 'medium',
      timeframe: 'Medium-term',
    },
    {
      id: 'risk_3',
      type: 'other',
      description: 'External circumstances may change unfavorably',
      probability: 0.25,
      impact: 8,
      severity: 'high',
      timeframe: 'Long-term',
    },
  ];
}

function generateUncertainties(structure: DecisionStructure): Uncertainty[] {
  return [
    {
      factor: 'Economic conditions',
      description: 'Overall economic climate and market conditions are unpredictable',
      impactRange: [-20, 30],
      controllability: 0.1,
    },
    {
      factor: 'Personal adaptation',
      description: 'Individual ability to adapt to new circumstances varies',
      impactRange: [-15, 25],
      controllability: 0.6,
    },
    {
      factor: 'External opportunities',
      description: 'Future opportunities and alternatives are unknown',
      impactRange: [-10, 40],
      controllability: 0.3,
    },
    {
      factor: 'Relationship dynamics',
      description: 'How relationships evolve is inherently uncertain',
      impactRange: [-25, 20],
      controllability: 0.5,
    },
    {
      factor: 'Health factors',
      description: 'Health and wellbeing can change unexpectedly',
      impactRange: [-30, 15],
      controllability: 0.4,
    },
  ];
}

function generateMitigationStrategies(risks: Risk[]): MitigationStrategy[] {
  return risks
    .filter(risk => risk.severity === 'high' || risk.severity === 'critical')
    .map(risk => ({
      riskId: risk.id,
      strategy: generateMitigationStrategy(risk),
      effectiveness: 0.5 + Math.random() * 0.4,
      cost: determineCost(risk.impact),
    }));
}

function generateMitigationStrategy(risk: Risk): string {
  const strategies: Record<string, string> = {
    career: 'Research company culture thoroughly before accepting. Request trial period or probation clause.',
    financial: 'Create detailed budget for new location. Negotiate relocation package and cost-of-living adjustment.',
    relationship: 'Establish regular communication schedule. Plan frequent visits. Build new social connections proactively.',
    health: 'Set clear work-life boundaries from day one. Prioritize self-care and stress management practices.',
    other: 'Build emergency fund covering 6-12 months expenses. Maintain professional network and skills.',
  };

  return strategies[risk.type] || 'Develop contingency plan and monitor situation closely.';
}

function determineCost(impact: number): string {
  if (impact >= 8) return 'High investment required';
  if (impact >= 6) return 'Moderate resources needed';
  return 'Low cost, primarily time and attention';
}

function generateWorstCase(input: DecisionInput, risks: Risk[]): Scenario {
  const criticalRisks = risks.filter(r => r.severity === 'critical' || r.severity === 'high');
  
  return {
    description: 'Multiple high-impact risks materialize simultaneously, creating a cascading failure scenario',
    probability: criticalRisks.reduce((acc, r) => acc * (1 - r.probability), 1 - 0.05),
    triggers: [
      'Economic downturn affects job security',
      'Personal health issues arise',
      'Key relationships deteriorate',
      'Financial pressures mount',
    ],
    consequences: [
      'Significant financial losses or instability',
      'Career setback or forced job change',
      'Damaged relationships requiring years to repair',
      'Prolonged stress affecting physical and mental health',
      'Loss of confidence and increased risk aversion',
      'Need to reverse decision at considerable cost',
    ],
  };
}
