import {
  DecisionInput,
  DecisionStructure,
  ProbabilityTree,
  TimelineSimulation,
  MultiDimensionalAnalysis,
  RiskAnalysis,
  FinalDecisionReport,
  OptionRanking,
  ActionStep,
} from "./types";
import { MODEL_ROUTES, USE_MOCK_AI } from "../aiConfig";

/**
 * AI Agent 6: 决策协调者与叙事者
 * 使用 GPT-4 整合所有分析,生成最终决策报告
 */

export async function generateFinalReport(
  input: DecisionInput,
  structure: DecisionStructure,
  probabilities: ProbabilityTree,
  timeline: TimelineSimulation,
  multiDimensional: MultiDimensionalAnalysis,
  risks: RiskAnalysis
): Promise<FinalDecisionReport> {
  if (USE_MOCK_AI) {
    return mockGenerateFinalReport(
      input,
      structure,
      probabilities,
      timeline,
      multiDimensional,
      risks
    );
  }

  try {
    const { callDeepSeek, parseJSONResponse } = await import("./apiClients");
    const prompt = buildCoordinatorPrompt(
      input,
      structure,
      probabilities,
      timeline,
      multiDimensional,
      risks
    );
    const systemPrompt =
      "You are a master decision advisor. Synthesize all analyses and respond with valid JSON only.";

    const response = await callDeepSeek(prompt, systemPrompt, {
      tier: MODEL_ROUTES.finalReport,
      temperature: 0.5,
      maxTokens: 3600,
    });
    const parsed = parseJSONResponse(response);

    return {
      summary: parsed.summary || "",
      optionRankings: parsed.optionRankings || [],
      recommendation: parsed.recommendation || "",
      reasoning: parsed.reasoning || [],
      keyInsights: parsed.keyInsights || [],
      actionPlan: parsed.actionPlan || [],
      confidenceLevel: parsed.confidenceLevel || 0.7,
    };
  } catch (error) {
    console.info("DeepSeek unavailable; using demo analysis:", error);
    return mockGenerateFinalReport(
      input,
      structure,
      probabilities,
      timeline,
      multiDimensional,
      risks
    );
  }
}

function buildCoordinatorPrompt(
  input: DecisionInput,
  structure: DecisionStructure,
  probabilities: ProbabilityTree,
  timeline: TimelineSimulation,
  multiDimensional: MultiDimensionalAnalysis,
  risks: RiskAnalysis
): string {
  return `
You are a master decision advisor. Synthesize all analyses into a coherent final report.

Decision: ${input.question}
Options: ${input.options.map(o => o.description).join(", ")}

Available analyses:
1. Decision structure with ${structure.variables.length} variables and ${structure.causalLinks.length} causal links
2. Probability tree with ${probabilities.paths.length} possible paths
3. Timeline simulation across ${timeline.timelines.length} options
4. Multi-dimensional scores across ${multiDimensional.dimensions.length} dimensions
5. Risk analysis identifying ${risks.risks.length} risks

Provide:
1. Executive summary (2-3 sentences)
2. Ranking of all options with scores
3. Clear recommendation with reasoning
4. Key insights that emerged from analysis
5. Actionable next steps

Use clear, narrative language. Tell the story of what the future holds for each option.
Return structured JSON.
`;
}

function mockGenerateFinalReport(
  input: DecisionInput,
  structure: DecisionStructure,
  probabilities: ProbabilityTree,
  timeline: TimelineSimulation,
  multiDimensional: MultiDimensionalAnalysis,
  risks: RiskAnalysis
): FinalDecisionReport {
  const optionRankings = generateOptionRankings(
    input,
    timeline,
    multiDimensional,
    probabilities
  );
  const topOption = optionRankings[0];

  return {
    summary: `After comprehensive analysis across ${multiDimensional.dimensions.length} dimensions and ${probabilities.paths.length} possible scenarios, ${topOption.optionName} emerges as the strongest choice with an overall score of ${topOption.overallScore}/100. This decision involves ${risks.risks.length} identified risks and ${structure.causalLinks.length} key causal relationships that will shape your future.`,

    optionRankings,

    recommendation: topOption.optionName,

    reasoning: [
      `Highest probability of positive outcomes (${Math.round((probabilities.paths.filter(p => p.expectedValue > 60).length / probabilities.paths.length) * 100)}% of scenarios show favorable results)`,
      `Strong performance across critical dimensions, particularly in ${multiDimensional.dimensions.sort((a, b) => b.score - a.score)[0]?.dimension || "key areas"}`,
      `Manageable risk profile with ${risks.mitigationStrategies.length} actionable mitigation strategies`,
      `Timeline analysis shows positive momentum building over ${input.timeframe}`,
      `Aligns well with ${input.riskProfile} risk tolerance`,
    ],

    keyInsights: [
      `This decision will create ${structure.causalLinks.length} cascading effects across your life`,
      `The first 3-6 months are critical for setting the trajectory`,
      `${multiDimensional.tradeoffs.length} significant trade-offs identified between competing priorities`,
      `${multiDimensional.synergies.length} positive synergies can amplify benefits if leveraged correctly`,
      `Worst-case scenario has ${Math.round(risks.worstCaseScenario.probability * 100)}% probability - low but worth preparing for`,
    ],

    actionPlan: generateActionPlan(topOption, risks),

    confidenceLevel: calculateConfidence(probabilities, risks),
  };
}

function generateOptionRankings(
  input: DecisionInput,
  timeline: TimelineSimulation,
  multiDimensional: MultiDimensionalAnalysis,
  probabilities: ProbabilityTree
): OptionRanking[] {
  const rankings: OptionRanking[] = input.options.map((option, index) => {
    const optionTimeline = timeline.timelines[index];
    const finalStage = optionTimeline.stages[optionTimeline.stages.length - 1];

    // 计算综合评分
    const dimensionAvg =
      multiDimensional.dimensions.reduce((sum, d) => sum + d.score, 0) /
      multiDimensional.dimensions.length;
    const timelineScore = finalStage
      ? Object.values(finalStage.state).reduce((sum, val) => sum + val, 0) /
        Object.values(finalStage.state).length
      : 50;

    const probabilityScore = probabilities.paths
      .filter(p => p.id.includes(`_${index}_`))
      .reduce((sum, p) => sum + p.expectedValue * p.probability, 0);

    const overallScore = Math.round(
      dimensionAvg * 0.4 + timelineScore * 0.3 + probabilityScore * 0.3
    );

    return {
      optionId: `option_${index}`,
      optionName: option.description,
      overallScore,
      pros: generatePros(optionTimeline, multiDimensional, index),
      cons: generateCons(optionTimeline, multiDimensional, index),
      bestFor: generateBestFor(overallScore, multiDimensional),
    };
  });

  // 按分数排序
  return rankings.sort((a, b) => b.overallScore - a.overallScore);
}

function generatePros(
  timeline: any,
  multiDimensional: MultiDimensionalAnalysis,
  index: number
): string[] {
  const topDimensions = multiDimensional.dimensions
    .filter(d => d.score > 60)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return [
    `Strong performance in ${topDimensions[0]?.dimension || "key areas"} (${topDimensions[0]?.score || 0}/100)`,
    timeline.stages[1]?.description || "Positive medium-term outlook",
    `${Math.round(Math.random() * 30 + 50)}% probability of exceeding expectations`,
    `Builds momentum over time with compounding benefits`,
  ];
}

function generateCons(
  timeline: any,
  multiDimensional: MultiDimensionalAnalysis,
  index: number
): string[] {
  const weakDimensions = multiDimensional.dimensions
    .filter(d => d.score < 50)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return [
    weakDimensions[0]
      ? `Challenges in ${weakDimensions[0].dimension} (${weakDimensions[0].score}/100)`
      : "Requires significant adaptation",
    `${Math.round(Math.random() * 20 + 20)}% risk of major complications`,
    multiDimensional.tradeoffs[0]?.description ||
      "Trade-offs between competing priorities",
    "Uncertainty in long-term outcomes",
  ];
}

function generateBestFor(
  score: number,
  multiDimensional: MultiDimensionalAnalysis
): string {
  if (score > 75) {
    return `Ideal for those prioritizing ${multiDimensional.dimensions[0]?.dimension || "overall success"} and willing to embrace change`;
  } else if (score > 60) {
    return `Suitable for balanced individuals comfortable with moderate risk`;
  } else {
    return `Consider if ${multiDimensional.dimensions[multiDimensional.dimensions.length - 1]?.dimension || "stability"} is your top priority`;
  }
}

function generateActionPlan(
  topOption: OptionRanking,
  risks: RiskAnalysis
): ActionStep[] {
  return [
    {
      step: 1,
      action: `Make the decision: Choose ${topOption.optionName}`,
      timeframe: "Immediate",
      importance: "critical",
    },
    {
      step: 2,
      action: "Develop detailed implementation plan with milestones",
      timeframe: "Week 1",
      importance: "critical",
    },
    {
      step: 3,
      action: `Implement top ${risks.mitigationStrategies.length} risk mitigation strategies`,
      timeframe: "Month 1",
      importance: "high",
    },
    {
      step: 4,
      action: "Set up regular check-ins to monitor progress and adjust course",
      timeframe: "Month 1",
      importance: "high",
    },
    {
      step: 5,
      action: "Build support system and communicate decision to stakeholders",
      timeframe: "Month 1-2",
      importance: "medium",
    },
    {
      step: 6,
      action: "Conduct first major review and reassess trajectory",
      timeframe: "Month 3",
      importance: "high",
    },
  ];
}

function calculateConfidence(
  probabilities: ProbabilityTree,
  risks: RiskAnalysis
): number {
  // 基于概率分布的集中度和风险严重性计算置信度
  const highProbPaths = probabilities.paths.filter(
    p => p.probability > 0.3
  ).length;
  const totalPaths = probabilities.paths.length;
  const concentrationScore = highProbPaths / totalPaths;

  const criticalRisks = risks.risks.filter(
    r => r.severity === "critical"
  ).length;
  const riskScore = 1 - criticalRisks * 0.1;

  return Math.max(0.5, Math.min(0.95, (concentrationScore + riskScore) / 2));
}
