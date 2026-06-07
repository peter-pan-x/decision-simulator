import {
  DecisionInput,
  DecisionStructure,
  ProbabilityTree,
  DecisionPath,
} from "./types";
import { MODEL_ROUTES, USE_MOCK_AI } from "../aiConfig";

/**
 * AI Agent 2: 概率计算器
 * 使用 DeepSeek v4flash 进行贝叶斯推理和概率计算
 */

export async function calculateProbabilities(
  input: DecisionInput,
  structure: DecisionStructure
): Promise<ProbabilityTree> {
  if (USE_MOCK_AI) {
    return mockCalculateProbabilities(input, structure);
  }

  try {
    const { callDeepSeek, parseJSONResponse } = await import("./apiClients");
    const prompt = buildProbabilityPrompt(input, structure);
    const systemPrompt =
      "You are a probability and Bayesian reasoning expert. Respond with valid JSON only.";

    const response = await callDeepSeek(prompt, systemPrompt, {
      tier: MODEL_ROUTES.probability,
      temperature: 0.25,
    });
    const parsed = parseJSONResponse(response);

    return {
      paths: parsed.paths || [],
      distributions: parsed.distributions || [],
    };
  } catch (error) {
    console.info("DeepSeek unavailable; using demo analysis:", error);
    return mockCalculateProbabilities(input, structure);
  }
}

function buildProbabilityPrompt(
  input: DecisionInput,
  structure: DecisionStructure
): string {
  return `
You are a probability and Bayesian reasoning expert. Given the decision structure, calculate:

1. Probability of each decision path
2. Expected outcomes for each path
3. Probability distributions for key variables

Decision: ${input.question}
Options: ${input.options.map(o => o.description).join(", ")}

Variables: ${JSON.stringify(structure.variables, null, 2)}
Causal Links: ${JSON.stringify(structure.causalLinks, null, 2)}

Use Bayesian networks to compute:
- Path probabilities (considering all causal links)
- Expected values for each outcome
- Uncertainty ranges

Return JSON format:
{
  "paths": [{"id", "sequence", "probability", "outcome", "expectedValue"}],
  "distributions": [{"variable", "distribution": [{"value", "probability"}]}]
}
`;
}

function mockCalculateProbabilities(
  input: DecisionInput,
  structure: DecisionStructure
): ProbabilityTree {
  const paths: DecisionPath[] = [];

  // 为每个选项生成多条可能路径
  input.options.forEach((option, optionIndex) => {
    // 最佳路径
    paths.push({
      id: `path_${optionIndex}_best`,
      sequence: [
        option.description,
        "Initial adaptation successful",
        "Positive momentum builds",
        "Goals achieved",
      ],
      probability: 0.25,
      outcome: "Best case scenario",
      expectedValue: 85 + Math.random() * 10,
    });

    // 最可能路径
    paths.push({
      id: `path_${optionIndex}_likely`,
      sequence: [
        option.description,
        "Gradual adjustment period",
        "Mixed results with challenges",
        "Moderate success",
      ],
      probability: 0.5,
      outcome: "Most likely scenario",
      expectedValue: 60 + Math.random() * 15,
    });

    // 困难路径
    paths.push({
      id: `path_${optionIndex}_difficult`,
      sequence: [
        option.description,
        "Unexpected obstacles arise",
        "Significant adaptation required",
        "Challenging outcome",
      ],
      probability: 0.2,
      outcome: "Difficult scenario",
      expectedValue: 35 + Math.random() * 15,
    });

    // 失败路径
    paths.push({
      id: `path_${optionIndex}_worst`,
      sequence: [
        option.description,
        "Major complications",
        "Cascading problems",
        "Worst case outcome",
      ],
      probability: 0.05,
      outcome: "Worst case scenario",
      expectedValue: 15 + Math.random() * 10,
    });
  });

  // 生成概率分布
  const distributions = structure.variables.map(variable => ({
    variable: variable.id,
    distribution: generateDistribution(variable.initialValue || 50),
  }));

  return {
    paths,
    distributions,
  };
}

function generateDistribution(
  mean: number
): Array<{ value: number; probability: number }> {
  // 生成正态分布
  const distribution: Array<{ value: number; probability: number }> = [];
  const stdDev = 15;

  for (let value = 0; value <= 100; value += 10) {
    const probability = normalPDF(value, mean, stdDev);
    distribution.push({ value, probability });
  }

  // 归一化
  const total = distribution.reduce((sum, d) => sum + d.probability, 0);
  distribution.forEach(d => (d.probability /= total));

  return distribution;
}

function normalPDF(x: number, mean: number, stdDev: number): number {
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return Math.exp(exponent) / (stdDev * Math.sqrt(2 * Math.PI));
}
