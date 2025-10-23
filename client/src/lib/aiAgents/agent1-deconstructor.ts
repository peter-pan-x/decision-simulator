import { DecisionInput, DecisionStructure, Variable, CausalLink } from './types';
import { USE_MOCK_AI } from '../aiConfig';

/**
 * AI Agent 1: 决策解构师
 * 使用 GPT-4 深度理解决策,构建因果关系网络
 */

export async function analyzeDecisionStructure(
  input: DecisionInput
): Promise<DecisionStructure> {
  if (USE_MOCK_AI) {
    return mockAnalyzeDecisionStructure(input);
  }

  try {
    const { callOpenAI, parseJSONResponse } = await import('./apiClients');
    const prompt = buildDeconstructorPrompt(input);
    const systemPrompt = 'You are an expert decision analyst. Always respond with valid JSON only, no additional text.';
    
    const response = await callOpenAI(prompt, systemPrompt);
    const parsed = parseJSONResponse(response);
    
    return {
      variables: parsed.variables || [],
      causalLinks: parsed.causalLinks || [],
      assumptions: parsed.assumptions || [],
      constraints: parsed.constraints || [],
    };
  } catch (error) {
    console.error('OpenAI API failed, falling back to mock:', error);
    return mockAnalyzeDecisionStructure(input);
  }
}

function buildDeconstructorPrompt(input: DecisionInput): string {
  return `
You are a decision analysis expert. Analyze the following decision scenario and extract:

1. All relevant variables (financial, career, lifestyle, relationships, health, time)
2. Causal relationships between variables (with strength -1 to 1)
3. Hidden assumptions
4. Constraints

Decision: ${input.question}

Options:
${input.options.map((opt, i) => `${i + 1}. ${opt.description}`).join('\n')}

Dimensions of concern: ${input.dimensions.join(', ')}
Timeframe: ${input.timeframe}
Risk profile: ${input.riskProfile}

Return a structured JSON with:
{
  "variables": [{"id", "name", "type", "description"}],
  "causalLinks": [{"from", "to", "strength", "delay", "description"}],
  "assumptions": ["..."],
  "constraints": ["..."]
}
`;
}

// 模拟AI响应
function mockAnalyzeDecisionStructure(input: DecisionInput): DecisionStructure {
  const isJobDecision = input.question.toLowerCase().includes('job') || 
                        input.question.toLowerCase().includes('work');
  
  if (isJobDecision) {
    return mockJobDecisionStructure(input);
  }
  
  return mockGenericDecisionStructure(input);
}

function mockJobDecisionStructure(input: DecisionInput): DecisionStructure {
  const variables: Variable[] = [
    {
      id: 'salary',
      name: 'Salary',
      type: 'financial',
      description: 'Monthly income level',
      initialValue: 50,
    },
    {
      id: 'career_growth',
      name: 'Career Growth',
      type: 'career',
      description: 'Professional development opportunities',
      initialValue: 50,
    },
    {
      id: 'work_life_balance',
      name: 'Work-Life Balance',
      type: 'lifestyle',
      description: 'Time for personal life and hobbies',
      initialValue: 50,
    },
    {
      id: 'location_satisfaction',
      name: 'Location Satisfaction',
      type: 'lifestyle',
      description: 'Happiness with living location',
      initialValue: 50,
    },
    {
      id: 'family_relationships',
      name: 'Family Relationships',
      type: 'relationships',
      description: 'Quality of family connections',
      initialValue: 70,
    },
    {
      id: 'social_network',
      name: 'Social Network',
      type: 'relationships',
      description: 'Size and quality of friend network',
      initialValue: 60,
    },
    {
      id: 'stress_level',
      name: 'Stress Level',
      type: 'health',
      description: 'Overall stress and anxiety',
      initialValue: 50,
    },
    {
      id: 'job_satisfaction',
      name: 'Job Satisfaction',
      type: 'career',
      description: 'Overall happiness with work',
      initialValue: 50,
    },
    {
      id: 'financial_security',
      name: 'Financial Security',
      type: 'financial',
      description: 'Sense of financial stability',
      initialValue: 50,
    },
  ];

  const causalLinks: CausalLink[] = [
    {
      from: 'salary',
      to: 'financial_security',
      strength: 0.8,
      delay: 1,
      description: 'Higher salary directly improves financial security',
    },
    {
      from: 'salary',
      to: 'stress_level',
      strength: -0.3,
      delay: 3,
      description: 'Better pay reduces financial stress',
    },
    {
      from: 'career_growth',
      to: 'job_satisfaction',
      strength: 0.7,
      delay: 6,
      description: 'Growth opportunities increase job satisfaction',
    },
    {
      from: 'location_satisfaction',
      to: 'work_life_balance',
      strength: 0.5,
      delay: 3,
      description: 'Good location improves work-life balance',
    },
    {
      from: 'location_satisfaction',
      to: 'family_relationships',
      strength: 0.6,
      delay: 1,
      description: 'Proximity to family strengthens relationships',
    },
    {
      from: 'work_life_balance',
      to: 'family_relationships',
      strength: 0.5,
      delay: 6,
      description: 'More free time improves family connections',
    },
    {
      from: 'work_life_balance',
      to: 'stress_level',
      strength: -0.6,
      delay: 3,
      description: 'Better balance reduces stress',
    },
    {
      from: 'social_network',
      to: 'stress_level',
      strength: -0.4,
      delay: 6,
      description: 'Strong social support reduces stress',
    },
    {
      from: 'stress_level',
      to: 'job_satisfaction',
      strength: -0.5,
      delay: 3,
      description: 'High stress reduces job satisfaction',
    },
    {
      from: 'financial_security',
      to: 'stress_level',
      strength: -0.5,
      delay: 6,
      description: 'Financial stability reduces overall stress',
    },
  ];

  const assumptions = [
    'The new job offer is from a reputable company with stable prospects',
    'Relocation would require moving away from current family and friends',
    'Current company has limited growth opportunities',
    'Housing costs in the new location are comparable or manageable',
    'Partner/spouse is supportive of the potential move',
  ];

  const constraints = [
    'Must make decision within 2-4 weeks',
    'Relocation would be required if accepting new offer',
    'Current lease/mortgage situation',
    'Children\'s schooling considerations (if applicable)',
    'Career trajectory is a long-term consideration',
  ];

  return {
    variables,
    causalLinks,
    assumptions,
    constraints,
  };
}

function mockGenericDecisionStructure(input: DecisionInput): DecisionStructure {
  // 通用决策结构
  const variables: Variable[] = input.dimensions.map((dim, i) => ({
    id: `var_${dim}`,
    name: dim.charAt(0).toUpperCase() + dim.slice(1),
    type: dim as any,
    description: `Impact on ${dim}`,
    initialValue: 50,
  }));

  const causalLinks: CausalLink[] = [];
  // 创建一些基本的因果关系
  for (let i = 0; i < variables.length - 1; i++) {
    causalLinks.push({
      from: variables[i].id,
      to: variables[i + 1].id,
      strength: 0.5,
      delay: 3,
      description: `${variables[i].name} influences ${variables[i + 1].name}`,
    });
  }

  return {
    variables,
    causalLinks,
    assumptions: [
      'All options are feasible and within reach',
      'External circumstances remain relatively stable',
      'Personal values and priorities remain consistent',
    ],
    constraints: [
      'Decision must be made within a reasonable timeframe',
      'Resources (time, money, energy) are finite',
    ],
  };
}

