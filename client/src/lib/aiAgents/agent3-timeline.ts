import {
  DecisionInput,
  DecisionStructure,
  ProbabilityTree,
  TimelineSimulation,
  Timeline,
  TimeStage,
  Milestone,
  TurningPoint,
} from "./types";
import { MODEL_ROUTES, USE_MOCK_AI } from "../aiConfig";

/**
 * AI Agent 3: 时序演化模拟器
 * 使用 GPT-4 模拟决策在时间轴上的展开
 */

export async function simulateTimeline(
  input: DecisionInput,
  structure: DecisionStructure,
  probabilities: ProbabilityTree
): Promise<TimelineSimulation> {
  if (USE_MOCK_AI) {
    return mockSimulateTimeline(input, structure, probabilities);
  }

  try {
    const { callDeepSeek, parseJSONResponse } = await import("./apiClients");
    const prompt = buildTimelinePrompt(input, structure, probabilities);
    const systemPrompt =
      "You are a future scenario expert. Respond with valid JSON only.";

    const response = await callDeepSeek(prompt, systemPrompt, {
      tier: MODEL_ROUTES.timeline,
      temperature: 0.45,
    });
    const parsed = parseJSONResponse(response);

    return {
      timelines: parsed.timelines || [],
      keyMilestones: parsed.keyMilestones || [],
      turningPoints: parsed.turningPoints || [],
    };
  } catch (error) {
    console.info("DeepSeek unavailable; using demo analysis:", error);
    return mockSimulateTimeline(input, structure, probabilities);
  }
}

function buildTimelinePrompt(
  input: DecisionInput,
  structure: DecisionStructure,
  probabilities: ProbabilityTree
): string {
  return `
You are a future scenario expert. Simulate how this decision evolves over time.

Decision: ${input.question}
Options: ${input.options.map(o => o.description).join(", ")}
Timeframe: ${input.timeframe}

Variables: ${structure.variables.map(v => v.name).join(", ")}
Most likely paths: ${probabilities.paths
    .filter(p => p.probability > 0.3)
    .map(p => p.outcome)
    .join(", ")}

For each option, describe the state at:
- 3 months: Initial phase
- 1 year: Establishment phase
- 3 years: Maturity phase
- 5 years: Long-term outcome

Include:
- Variable values at each stage
- Key events and milestones
- Turning points where trajectory could change
- External factors that might influence the path

Return JSON format with timelines, milestones, and turning points.
`;
}

function mockSimulateTimeline(
  input: DecisionInput,
  structure: DecisionStructure,
  probabilities: ProbabilityTree
): TimelineSimulation {
  const timelines: Timeline[] = input.options.map((option, index) => {
    const isFirstOption = index === 0;
    return {
      optionId: `option_${index}`,
      stages: generateTimeStages(option.description, structure, isFirstOption),
    };
  });

  const keyMilestones: Milestone[] = [
    {
      time: "3_months",
      description: "Initial adaptation period completes",
      impact: 0.6,
    },
    {
      time: "1_year",
      description: "First major evaluation point",
      impact: 0.8,
    },
    {
      time: "3_years",
      description: "Long-term patterns established",
      impact: 0.9,
    },
  ];

  const turningPoints: TurningPoint[] = [
    {
      time: "6_months",
      description: "Critical decision point: Continue or pivot",
      probability: 0.3,
      consequences: [
        "Could lead to accelerated growth",
        "Or trigger reconsideration of the choice",
      ],
    },
    {
      time: "2_years",
      description: "Major life event or opportunity arises",
      probability: 0.4,
      consequences: [
        "May open new unexpected paths",
        "Could challenge current trajectory",
      ],
    },
  ];

  return {
    timelines,
    keyMilestones,
    turningPoints,
  };
}

function generateTimeStages(
  optionDescription: string,
  structure: DecisionStructure,
  isPositive: boolean
): TimeStage[] {
  const baseMultiplier = isPositive ? 1.2 : 0.9;

  return [
    {
      timepoint: "3_months",
      state: generateVariableState(structure, 0.3, baseMultiplier),
      description: isPositive
        ? "Initial adjustment phase showing promising signs. New routines being established."
        : "Adaptation challenges present. Working through initial difficulties.",
      events: [
        "First impressions and reactions",
        "Immediate lifestyle changes take effect",
        "Initial feedback and results",
      ],
    },
    {
      timepoint: "1_year",
      state: generateVariableState(structure, 0.6, baseMultiplier),
      description: isPositive
        ? "Solid foundation built. Clear progress visible in multiple areas."
        : "Mixed results emerging. Some areas improving, others still challenging.",
      events: [
        "First major milestone reached",
        "Patterns and habits solidified",
        "Relationships and networks evolving",
      ],
    },
    {
      timepoint: "3_years",
      state: generateVariableState(structure, 0.85, baseMultiplier),
      description: isPositive
        ? "Significant achievements realized. Benefits compounding over time."
        : "Long-term challenges becoming apparent. Reevaluation may be needed.",
      events: [
        "Major life changes integrated",
        "Career trajectory clearly defined",
        "Long-term impacts on relationships visible",
      ],
    },
    {
      timepoint: "5_years",
      state: generateVariableState(structure, 1.0, baseMultiplier),
      description: isPositive
        ? "Full potential realized. Decision proved beneficial in the long run."
        : "Consequences fully manifested. Lessons learned, adjustments made.",
      events: [
        "Ultimate outcomes crystallized",
        "Life trajectory significantly altered",
        "Legacy of the decision clear",
      ],
    },
  ];
}

function generateVariableState(
  structure: DecisionStructure,
  timeProgress: number,
  multiplier: number
): Record<string, number> {
  const state: Record<string, number> = {};

  structure.variables.forEach(variable => {
    const base = variable.initialValue || 50;
    const change = (Math.random() * 40 - 20) * timeProgress * multiplier;
    state[variable.id] = Math.max(0, Math.min(100, base + change));
  });

  return state;
}
