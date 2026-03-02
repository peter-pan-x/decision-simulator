import { DecisionInput } from '@/components/DecisionInput';
import { OptionAnalysis, CascadeEffect } from '@/components/AnalysisResults';

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

  const firstOrderTemplates: Record<string, string[]> = {
    financial: ['Immediate change in income/expenses', 'Short-term cash flow adjustment'],
    career: ['Change in daily work responsibilities', 'New skill requirements'],
    lifestyle: ['Daily routine restructuring', 'Time allocation changes'],
    relationships: ['Impact on existing relationships', 'New social circle exposure'],
    health: ['Stress level changes', 'Physical activity pattern shift'],
    time: ['Immediate time commitment change', 'Schedule flexibility impact'],
  };

  const secondOrderTemplates: Record<string, string[]> = {
    financial: ['Long-term wealth accumulation trajectory', 'Financial security perception shift'],
    career: ['Professional reputation evolution', 'Industry positioning shift'],
    lifestyle: ['Quality of life trajectory', 'Personal satisfaction evolution'],
    relationships: ['Social capital accumulation', 'Support network strength change'],
    health: ['Overall wellbeing trajectory', 'Energy level patterns'],
    time: ['Long-term time freedom', 'Skill development capacity'],
  };

  const thirdOrderTemplates: Record<string, string[]> = {
    financial: ['Generational wealth impact', 'Economic independence level'],
    career: ['Career trajectory transformation', 'Industry influence potential'],
    lifestyle: ['Life philosophy evolution', 'Personal identity transformation'],
    relationships: ['Social impact potential', 'Community influence capacity'],
    health: ['Longevity and vitality', 'Life quality in later years'],
    time: ['Life balance achievement', 'Time mastery and autonomy'],
  };

  dimensions.forEach((dim) => {
    if (firstOrderTemplates[dim]) {
      effects.first_order.push(firstOrderTemplates[dim][Math.floor(Math.random() * firstOrderTemplates[dim].length)]);
    }
    if (secondOrderTemplates[dim]) {
      effects.second_order.push(secondOrderTemplates[dim][Math.floor(Math.random() * secondOrderTemplates[dim].length)]);
    }
    if (thirdOrderTemplates[dim]) {
      effects.third_order.push(thirdOrderTemplates[dim][Math.floor(Math.random() * thirdOrderTemplates[dim].length)]);
    }
  });

  return effects;
}

// 主分析函数 (Legacy, for backward compatibility if needed)
export async function analyzeDecision(input: DecisionInput): Promise<OptionAnalysis[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const context = getAnalysisContext(input);
  const results: OptionAnalysis[] = [];

  for (const option of input.options) {
    const dimensionScores = input.dimensions.map(dim => ({
      dimension: dim,
      score: Math.min(100, Math.max(0, Math.round((40 + Math.random() * 40) * context.riskMultiplier * context.timeMultiplier))),
      details: `Analysis of ${dim} impact for ${option.description}`
    }));

    const overallScore = Math.round(
      dimensionScores.reduce((a, b) => a + b.score, 0) / dimensionScores.length
    );

    const analysis: OptionAnalysis = {
      optionId: option.id,
      optionName: option.description,
      overallScore: overallScore,
      dimensionScores: dimensionScores,
      pros: ['Positive factor 1', 'Positive factor 2'],
      cons: ['Negative factor 1', 'Negative factor 2'],
      bestFor: 'Long-term growth',
      riskLevel: overallScore > 70 ? 'low' : overallScore > 40 ? 'medium' : 'high',
      cascadeEffects: generateCascadeEffects(option.description, input.dimensions, context),
      key_uncertainties: ['Market volatility', 'Personal adaptation'],
    };

    results.push(analysis);
  }

  return results;
}
