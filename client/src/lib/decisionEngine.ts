import { DecisionInput } from '@/components/DecisionInput';
import { OptionAnalysis, CascadeEffect, Scenario } from '@/components/AnalysisResults';

interface AnalysisContext {
  timeMultiplier: number;
  riskMultiplier: number;
  riskProfile: string;
  dimensionWeights: Record<string, number>;
}

// 根据时间跨度和风险偏好计算上下文
function getAnalysisContext(input: DecisionInput): AnalysisContext {
  const timeMultipliers = {
    short: 0.8,
    medium: 1.0,
    long: 1.3,
  };

  const riskMultipliers = {
    conservative: 0.7,
    balanced: 1.0,
    aggressive: 1.4,
  };

  // 维度权重(可以根据用户选择的维度动态调整)
  const dimensionWeights: Record<string, number> = {
    financial: 1.0,
    career: 1.0,
    lifestyle: 0.9,
    relationships: 0.8,
    health: 1.1,
    time: 0.85,
  };

  return {
    timeMultiplier: timeMultipliers[input.timeframe as keyof typeof timeMultipliers] || 1.0,
    riskMultiplier: riskMultipliers[input.riskProfile as keyof typeof riskMultipliers] || 1.0,
    riskProfile: input.riskProfile,
    dimensionWeights,
  };
}

// 生成级联效应
function generateCascadeEffects(
  option: string,
  dimensions: string[],
  context: AnalysisContext
): CascadeEffect {
  const effects: CascadeEffect = {
    first_order: [],
    second_order: [],
    third_order: [],
  };

  // 一阶效应模板(直接影响)
  const firstOrderTemplates: Record<string, string[]> = {
    financial: [
      'Immediate change in income/expenses',
      'Short-term cash flow adjustment',
      'Initial investment or cost',
    ],
    career: [
      'Change in daily work responsibilities',
      'New skill requirements',
      'Shift in professional network',
    ],
    lifestyle: [
      'Daily routine restructuring',
      'Time allocation changes',
      'Living environment adjustment',
    ],
    relationships: [
      'Impact on existing relationships',
      'New social circle exposure',
      'Communication pattern changes',
    ],
    health: [
      'Stress level changes',
      'Physical activity pattern shift',
      'Sleep and rest schedule adjustment',
    ],
    time: [
      'Immediate time commitment change',
      'Schedule flexibility impact',
      'Priority reallocation',
    ],
  };

  // 二阶效应模板(间接影响)
  const secondOrderTemplates: Record<string, string[]> = {
    financial: [
      'Long-term wealth accumulation trajectory',
      'Financial security perception shift',
      'Investment opportunity landscape change',
    ],
    career: [
      'Professional reputation evolution',
      'Industry positioning shift',
      'Future opportunity pipeline development',
    ],
    lifestyle: [
      'Quality of life trajectory',
      'Personal satisfaction evolution',
      'Habit formation and lifestyle patterns',
    ],
    relationships: [
      'Social capital accumulation',
      'Support network strength change',
      'Relationship depth evolution',
    ],
    health: [
      'Overall wellbeing trajectory',
      'Energy level patterns',
      'Mental health evolution',
    ],
    time: [
      'Long-term time freedom',
      'Skill development capacity',
      'Personal growth opportunities',
    ],
  };

  // 三阶效应模板(深层影响)
  const thirdOrderTemplates: Record<string, string[]> = {
    financial: [
      'Generational wealth impact',
      'Economic independence level',
      'Financial legacy potential',
    ],
    career: [
      'Career trajectory transformation',
      'Industry influence potential',
      'Professional legacy creation',
    ],
    lifestyle: [
      'Life philosophy evolution',
      'Personal identity transformation',
      'Legacy and meaning creation',
    ],
    relationships: [
      'Social impact potential',
      'Community influence capacity',
      'Relationship legacy',
    ],
    health: [
      'Longevity and vitality',
      'Life quality in later years',
      'Health legacy for family',
    ],
    time: [
      'Life balance achievement',
      'Time mastery and autonomy',
      'Legacy time allocation',
    ],
  };

  // 根据选择的维度生成效应
  dimensions.forEach((dim) => {
    if (firstOrderTemplates[dim]) {
      effects.first_order.push(
        firstOrderTemplates[dim][Math.floor(Math.random() * firstOrderTemplates[dim].length)]
      );
    }
    if (secondOrderTemplates[dim]) {
      effects.second_order.push(
        secondOrderTemplates[dim][Math.floor(Math.random() * secondOrderTemplates[dim].length)]
      );
    }
    if (thirdOrderTemplates[dim]) {
      effects.third_order.push(
        thirdOrderTemplates[dim][Math.floor(Math.random() * thirdOrderTemplates[dim].length)]
      );
    }
  });

  return effects;
}

// 计算维度评分
function calculateDimensionScores(
  option: string,
  dimensions: string[],
  context: AnalysisContext
): Record<string, number> {
  const scores: Record<string, number> = {};

  dimensions.forEach((dim) => {
    // 基础分数 (40-80)
    let baseScore = 40 + Math.random() * 40;

    // 应用风险调整
    baseScore *= context.riskMultiplier;

    // 应用时间调整
    baseScore *= context.timeMultiplier;

    // 应用维度权重
    baseScore *= context.dimensionWeights[dim] || 1.0;

    // 限制在0-100范围
    scores[dim] = Math.min(100, Math.max(0, Math.round(baseScore)));
  });

  return scores;
}

// 生成场景
function generateScenarios(
  option: string,
  dimensionScores: Record<string, number>,
  context: AnalysisContext
): {
  best_case: Scenario;
  most_likely: Scenario;
  worst_case: Scenario;
} {
  const avgScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0) / Object.values(dimensionScores).length;

  return {
    best_case: {
      description: `In the best scenario, all factors align favorably. Key advantages materialize early, and unexpected opportunities emerge. Success metrics exceed initial expectations by 20-30%.`,
      probability: context.riskProfile === 'aggressive' ? 0.25 : context.riskProfile === 'balanced' ? 0.2 : 0.15,
    },
    most_likely: {
      description: `The most probable outcome involves steady progress with manageable challenges. Expected benefits materialize gradually, requiring consistent effort and adaptation. Results align with initial projections.`,
      probability: 0.6,
    },
    worst_case: {
      description: `In the challenging scenario, significant obstacles arise requiring substantial adaptation. Initial plans need revision, and timeline extends. However, recovery and learning opportunities exist.`,
      probability: context.riskProfile === 'conservative' ? 0.25 : context.riskProfile === 'balanced' ? 0.2 : 0.15,
    },
  };
}

// 识别关键不确定性
function identifyUncertainties(
  option: string,
  dimensions: string[],
  context: AnalysisContext
): string[] {
  const uncertaintyTemplates: Record<string, string[]> = {
    financial: [
      'Market volatility and economic conditions',
      'Unexpected expenses or revenue fluctuations',
      'Regulatory or tax policy changes',
    ],
    career: [
      'Industry trends and technological disruption',
      'Organizational changes and leadership shifts',
      'Skill relevance and learning curve',
    ],
    lifestyle: [
      'Personal adaptation speed and resilience',
      'External support availability',
      'Unforeseen life events',
    ],
    relationships: [
      'Others\' reactions and support level',
      'Social dynamics evolution',
      'Communication effectiveness',
    ],
    health: [
      'Physical and mental resilience',
      'Healthcare access and quality',
      'Stress management capacity',
    ],
    time: [
      'Actual time requirements vs. estimates',
      'Competing priorities emergence',
      'Efficiency and productivity factors',
    ],
  };

  const uncertainties: string[] = [];
  dimensions.slice(0, 3).forEach((dim) => {
    if (uncertaintyTemplates[dim]) {
      uncertainties.push(
        uncertaintyTemplates[dim][Math.floor(Math.random() * uncertaintyTemplates[dim].length)]
      );
    }
  });

  return uncertainties;
}

// 主分析函数
export async function analyzeDecision(input: DecisionInput): Promise<OptionAnalysis[]> {
  // 模拟分析延迟
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const context = getAnalysisContext(input);
  const results: OptionAnalysis[] = [];

  for (const option of input.options) {
    const dimensionScores = calculateDimensionScores(option.description, input.dimensions, context);
    const overallScore = Math.round(
      Object.values(dimensionScores).reduce((a, b) => a + b, 0) / Object.values(dimensionScores).length
    );

    const analysis: OptionAnalysis = {
      option_name: option.description,
      overall_score: overallScore,
      cascade_effects: generateCascadeEffects(option.description, input.dimensions, context),
      dimension_scores: dimensionScores,
      scenarios: generateScenarios(option.description, dimensionScores, context),
      key_uncertainties: identifyUncertainties(option.description, input.dimensions, context),
    };

    results.push(analysis);
  }

  return results;
}

