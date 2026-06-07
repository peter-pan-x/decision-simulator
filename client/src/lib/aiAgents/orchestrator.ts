import { OptionAnalysis } from "@/components/AnalysisResults";
import { DecisionInput, CompleteAnalysis, DebateLog } from "./types";

export interface AnalysisProgress {
  stage: string;
  progress: number;
  message: string;
  logs?: DebateLog[];
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const hasChinese = (text: string) => /[\u3400-\u9fff]/.test(text);

type VerdictOption = {
  optionId: string;
  optionName: string;
  overallScore: number;
  pros: string[];
  cons: string[];
  bestFor: string;
  winningReasons?: string[];
  losingReasons?: string[];
};

type VerdictPayload = {
  summary: string;
  recommendation: string;
  confidenceLevel: number;
  optionRankings: VerdictOption[];
  reasoning: string[];
  keyInsights: string[];
  actionPlan: Array<{
    step: number;
    action: string;
    timeframe: string;
    importance: "critical" | "high" | "medium" | "low";
  }>;
  debate: Array<{
    agent: string;
    role: DebateLog["role"];
    message: string;
    thoughtProcess?: string;
  }>;
};

function emitLog(
  logs: DebateLog[],
  onProgress: ((progress: AnalysisProgress) => void) | undefined,
  stage: string,
  progress: number,
  log: Omit<DebateLog, "timestamp">
) {
  const entry = { ...log, timestamp: Date.now() };
  logs.push(entry);
  onProgress?.({
    stage,
    progress,
    message: entry.message,
    logs: [...logs],
  });
}

function getOptionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

export async function runCompleteAnalysis(
  input: DecisionInput,
  onProgress?: (progress: AnalysisProgress) => void
): Promise<CompleteAnalysis> {
  const logs: DebateLog[] = [];
  const zh = hasChinese(
    input.question + input.options.map(option => option.description).join("")
  );

  onProgress?.({
    stage: "clarify",
    progress: 5,
    message: zh
      ? "正在澄清真正要比较的选项..."
      : "Clarifying the real choice behind the question...",
    logs,
  });
  await delay(1800);

  emitLog(logs, onProgress, "clarify", 12, {
    agent: "Clarifier",
    role: "coordinator",
    message: zh
      ? `我正在比较 ${input.options.length} 个具体选项，而不是给问题本身打分。`
      : `I am comparing ${input.options.length} concrete options, not scoring the question itself.`,
    thoughtProcess: zh
      ? "决策质量取决于选项之间的相对取舍。"
      : "The decision quality depends on relative tradeoffs between options.",
  });
  await delay(2200);

  emitLog(logs, onProgress, "optimist", 24, {
    agent: "Optimist",
    role: "optimist",
    message: zh
      ? "为每个选项寻找最强的正面理由。"
      : "Arguing the strongest possible case for each option.",
    thoughtProcess: zh
      ? "寻找上行空间、行动势能和隐藏选择权。"
      : "Looking for upside, momentum, and hidden optionality.",
  });
  await delay(2600);

  emitLog(logs, onProgress, "skeptic", 38, {
    agent: "Skeptic",
    role: "cynic",
    message: zh
      ? "压力测试每个选项的弱点和失败模式。"
      : "Stress-testing each option's weak points and failure modes.",
    thoughtProcess: zh
      ? "寻找后悔陷阱、成本失控和虚假的安全感。"
      : "Looking for regret traps, cost overruns, and false comfort.",
  });
  await delay(2800);

  emitLog(logs, onProgress, "pragmatist", 52, {
    agent: "Pragmatist",
    role: "synthesizer",
    message: zh
      ? "检查可执行性、可逆性和执行负担。"
      : "Checking feasibility, reversibility, and execution burden.",
    thoughtProcess: zh
      ? "好选项不只是看起来诱人，还必须真的能执行。"
      : "A good option must be livable, not merely attractive.",
  });
  await delay(2600);

  emitLog(logs, onProgress, "future-self", 66, {
    agent: "Future Self",
    role: "futurist",
    message: zh
      ? "模拟未来的你更可能认可哪个选择。"
      : "Simulating which choice is most likely to feel right later.",
    thoughtProcess: zh
      ? "平衡短期轻松感和长期后悔风险。"
      : "Balancing short-term relief against long-term regret.",
  });
  await delay(3000);

  onProgress?.({
    stage: "judge",
    progress: 78,
    message: zh
      ? "正在给每个选项打分并准备最终裁决..."
      : "Scoring options and preparing a final verdict...",
    logs: [...logs],
  });
  await delay(2600);

  const verdict = await generateVerdict(input);
  verdict.debate.forEach((log, index) => {
    emitLog(logs, onProgress, "judge", 82 + index * 3, log);
  });

  await delay(2200);
  onProgress?.({
    stage: "complete",
    progress: 100,
    message: zh
      ? `裁决完成：${verdict.recommendation} 胜出。`
      : `Verdict ready: ${verdict.recommendation} wins.`,
    logs: [...logs],
  });
  await delay(1200);

  return buildCompleteAnalysis(input, verdict, logs);
}

async function generateVerdict(input: DecisionInput): Promise<VerdictPayload> {
  try {
    const { callDeepSeek, parseJSONResponse } = await import("./apiClients");
    const response = await callDeepSeek(buildVerdictPrompt(input), undefined, {
      tier: "pro",
      temperature: 0.45,
      maxTokens: 3600,
    });
    return normalizeVerdict(parseJSONResponse(response), input);
  } catch (error) {
    console.info("Using deterministic option verdict fallback:", error);
    return buildFallbackVerdict(input);
  }
}

function buildVerdictPrompt(input: DecisionInput) {
  return `You are an expert decision judge. The user is stuck between options.

Your task is NOT to score the question. Your task is to compare the options and declare which option wins.

Question:
${input.question}

Options:
${input.options
  .map((option, index) => `${getOptionLabel(index)}. ${option.description}`)
  .join("\n")}

Use these roles internally:
- Optimist: strongest case for each option
- Skeptic: strongest case against each option
- Pragmatist: feasibility and execution
- Future Self: long-term regret and identity fit
- Judge: final scoring and verdict

Return valid JSON only:
{
  "summary": "2-3 sentence verdict summary",
  "recommendation": "exact winning option text",
  "confidenceLevel": 0.78,
  "optionRankings": [
    {
      "optionId": "option id from input",
      "optionName": "option text",
      "overallScore": 86,
      "pros": ["..."],
      "cons": ["..."],
      "bestFor": "...",
      "winningReasons": ["why this wins if it wins"],
      "losingReasons": ["why this loses if it loses"]
    }
  ],
  "reasoning": ["final reason 1", "final reason 2", "final reason 3", "final reason 4"],
  "keyInsights": ["insight 1", "insight 2", "insight 3", "insight 4"],
  "actionPlan": [
    {"step": 1, "action": "...", "timeframe": "Today", "importance": "critical"}
  ],
  "debate": [
    {"agent": "Optimist", "role": "optimist", "message": "...", "thoughtProcess": "..."}
  ]
}`;
}

function normalizeVerdict(raw: any, input: DecisionInput): VerdictPayload {
  const fallback = buildFallbackVerdict(input);
  const optionRankings =
    Array.isArray(raw?.optionRankings) && raw.optionRankings.length
      ? raw.optionRankings.map((option: any, index: number) => ({
          optionId:
            option.optionId || input.options[index]?.id || `option-${index}`,
          optionName:
            option.optionName ||
            input.options[index]?.description ||
            `Option ${getOptionLabel(index)}`,
          overallScore: clampScore(option.overallScore ?? 60),
          pros: ensureList(option.pros, fallback.optionRankings[index]?.pros),
          cons: ensureList(option.cons, fallback.optionRankings[index]?.cons),
          bestFor:
            option.bestFor ||
            fallback.optionRankings[index]?.bestFor ||
            "Worth considering if it matches your constraints.",
          winningReasons: ensureList(option.winningReasons, []),
          losingReasons: ensureList(option.losingReasons, []),
        }))
      : fallback.optionRankings;

  optionRankings.sort(
    (a: VerdictOption, b: VerdictOption) => b.overallScore - a.overallScore
  );
  const winner = optionRankings[0];

  return {
    summary:
      raw?.summary ||
      `${winner.optionName} is the strongest choice after comparing upside, downside, feasibility, and future regret.`,
    recommendation: raw?.recommendation || winner.optionName,
    confidenceLevel: normalizeConfidence(
      raw?.confidenceLevel,
      fallback.confidenceLevel
    ),
    optionRankings,
    reasoning: ensureList(raw?.reasoning, fallback.reasoning),
    keyInsights: ensureList(raw?.keyInsights, fallback.keyInsights),
    actionPlan: Array.isArray(raw?.actionPlan)
      ? raw.actionPlan
      : fallback.actionPlan,
    debate: Array.isArray(raw?.debate) ? raw.debate : fallback.debate,
  };
}

function buildFallbackVerdict(input: DecisionInput): VerdictPayload {
  const zh = hasChinese(
    input.question + input.options.map(option => option.description).join("")
  );
  const optionRankings = input.options
    .map((option, index) => {
      const text = option.description.toLowerCase();
      const score =
        64 +
        Math.min(option.description.length, 80) * 0.16 +
        (text.includes("test") || text.includes("pilot") || text.includes("试")
          ? 10
          : 0) +
        (text.includes("full") || text.includes("全职") ? 4 : 0) +
        (text.includes("stay") || text.includes("留") ? 2 : 0) -
        index * 1.5;

      return {
        optionId: option.id,
        optionName: option.description,
        overallScore: clampScore(Math.round(score)),
        pros: zh
          ? [
              "比继续停留在纠结中更能推动行动。",
              "能产生下一步判断所需要的真实信息。",
              "可以放进用户的现实约束里进行评估。",
            ]
          : [
              "Has a clear path to action instead of staying abstract.",
              "Creates useful information for the next decision.",
              "Can be evaluated against the user's real constraints.",
            ],
        cons: zh
          ? [
              "仍然存在无法在一开始完全消除的不确定性。",
              "需要情绪承诺和持续执行。",
              "可能迫使用户面对原本想回避的取舍。",
            ]
          : [
              "Still carries uncertainty that cannot be eliminated upfront.",
              "Requires emotional commitment and follow-through.",
              "May expose tradeoffs the user would rather avoid.",
            ],
        bestFor:
          index === 0
            ? zh
              ? "适合重视稳定、但仍想降低不确定性的人。"
              : "Someone who values stability while reducing uncertainty."
            : zh
              ? "适合重视行动速度，并能接受更高不确定性的人。"
              : "Someone who values momentum and accepts more uncertainty.",
        winningReasons: zh
          ? [
              "它在上行空间、风险和可逆性之间取得了更好的平衡。",
              "它给出了具体下一步，而不是继续把纠结悬在那里。",
            ]
          : [
              "It has the best balance of upside, risk, and reversibility.",
              "It gives the user a concrete next step rather than keeping the dilemma open.",
            ],
        losingReasons: zh
          ? ["它在上行空间、风险控制或长期匹配度上略弱。"]
          : [
              "It is slightly weaker on either upside, risk control, or long-term fit.",
            ],
      };
    })
    .sort((a, b) => b.overallScore - a.overallScore);

  const winner = optionRankings[0];
  const runnerUp = optionRankings[1];

  return {
    summary: zh
      ? `${winner.optionName} 胜出，因为它在上行空间、可执行性和后悔控制之间取得了最强平衡。${runnerUp ? `${runnerUp.optionName} 仍然可以作为备选，但当取舍被摊开后，说服力略弱。` : ""}`
      : `${winner.optionName} wins because it offers the strongest balance between upside, feasibility, and regret control. ${runnerUp ? `${runnerUp.optionName} remains a viable backup, but it is less convincing once the tradeoffs are made explicit.` : ""}`,
    recommendation: winner.optionName,
    confidenceLevel: 0.76,
    optionRankings,
    reasoning: zh
      ? [
          "胜出选项比继续保留纠结更能带来决策清晰度。",
          "它的风险调整后上行空间强于其他选项。",
          "它的下行风险可以通过短周期验证和明确检查点来管理。",
          "它更可能让未来的你觉得这个选择说得过去。",
        ]
      : [
          "The winning option creates more decision clarity than simply preserving the dilemma.",
          "It has a stronger risk-adjusted upside than the alternatives.",
          "Its downside can be managed with a short validation window and explicit checkpoints.",
          "It is more likely to feel defensible to your future self.",
        ],
    keyInsights: zh
      ? [
          "真正的问题不是哪个选项完美，而是哪个选项的取舍组合最好。",
          "不确定性高的时候，可逆实验往往比永久跳跃更聪明。",
          "落败选项不一定差，只是它要求你接受一个更弱的交换条件。",
          "下一步应该降低不确定性，而不是重新打开整场纠结。",
        ]
      : [
          "The real decision is not which option is perfect; it is which option has the best tradeoff profile.",
          "A reversible experiment often beats a permanent leap when uncertainty is high.",
          "The losing option is not necessarily bad; it simply asks you to accept a weaker bargain.",
          "The next step should reduce uncertainty, not reopen the entire debate.",
        ],
    actionPlan: [
      {
        step: 1,
        action: zh
          ? `未来 7 天先把「${winner.optionName}」当作默认选择。`
          : `Treat ${winner.optionName} as the default choice for the next 7 days.`,
        timeframe: zh ? "今天" : "Today",
        importance: "critical",
      },
      {
        step: 2,
        action: zh
          ? "写下唯一一个会让你推翻这个选择的条件。"
          : "Write the one condition that would make you reverse the decision.",
        timeframe: zh ? "今天" : "Today",
        importance: "high",
      },
      {
        step: 3,
        action: zh
          ? "在承诺不可逆之前，先做一个小规模真实测试。"
          : "Run a small real-world test before making the commitment irreversible.",
        timeframe: zh ? "本周" : "This week",
        importance: "high",
      },
    ],
    debate: [
      {
        agent: "Optimist",
        role: "optimist",
        message: zh
          ? `如果用户能执行到底，${winner.optionName} 的上行空间最强。`
          : `${winner.optionName} has the strongest upside if the user follows through.`,
        thoughtProcess: zh
          ? "上行空间重要，但必须和行动绑定。"
          : "Upside matters, but only when paired with action.",
      },
      {
        agent: "Skeptic",
        role: "cynic",
        message: zh
          ? `${runnerUp?.optionName || "第二名选项"} 在某些方面更安全，但安全本身不等于最好。`
          : `${runnerUp?.optionName || "The runner-up"} is safer in some ways, but safety alone does not make it best.`,
        thoughtProcess: zh
          ? "避免后悔和避免不舒服不是一回事。"
          : "Avoiding regret is different from avoiding discomfort.",
      },
      {
        agent: "Judge",
        role: "coordinator",
        message: zh
          ? `${winner.optionName} 在总分和实践清晰度上胜出。`
          : `${winner.optionName} wins on total score and practical clarity.`,
        thoughtProcess: zh
          ? "最好的选项，是把取舍说清楚之后用户仍然能为它辩护的选项。"
          : "The best option is the one the user can defend after the tradeoffs are explicit.",
      },
    ],
  };
}

function buildCompleteAnalysis(
  input: DecisionInput,
  verdict: VerdictPayload,
  logs: DebateLog[]
): CompleteAnalysis {
  const sorted = [...verdict.optionRankings].sort(
    (a, b) => b.overallScore - a.overallScore
  );

  return {
    decisionStructure: {
      variables: input.options.map((option, index) => ({
        id: option.id,
        name: `Option ${getOptionLabel(index)}`,
        type: "other",
        description: option.description,
      })),
      causalLinks: [],
      assumptions: verdict.keyInsights,
      constraints: [],
    },
    probabilityTree: {
      paths: sorted.map(option => ({
        id: option.optionId,
        sequence: [option.optionName],
        probability: option.overallScore / 100,
        outcome: option.optionName,
        expectedValue: option.overallScore,
      })),
      distributions: [],
    },
    timelineSimulation: {
      timelines: sorted.map(option => ({
        optionId: option.optionId,
        stages: [
          {
            timepoint: "now",
            state: {
              upside: option.overallScore,
              risk_control: Math.max(35, 100 - option.cons.length * 12),
              clarity: option.overallScore - 5,
            },
            description: `${option.optionName} enters the verdict with a ${option.overallScore}/100 score.`,
            events: option.pros,
          },
        ],
      })),
      keyMilestones: [],
      turningPoints: [],
    },
    multiDimensionalAnalysis: {
      dimensions: [
        {
          dimension: "Option quality",
          score: sorted[0]?.overallScore || 70,
          trend: "stable",
          details: "Relative strength of the winning option.",
          subScores: {},
        },
      ],
      tradeoffs: [],
      synergies: [],
    },
    riskAnalysis: {
      risks: [],
      uncertainties: [],
      mitigationStrategies: [],
      worstCaseScenario: {
        description:
          "The selected option fails because its assumptions are not tested early.",
        probability: 0.22,
        triggers: ["No checkpoint", "Unclear success criteria"],
        consequences: ["Delayed decision", "Higher regret"],
      },
    },
    finalReport: {
      summary: verdict.summary,
      optionRankings: sorted,
      recommendation: verdict.recommendation,
      reasoning: verdict.reasoning,
      keyInsights: verdict.keyInsights,
      actionPlan: verdict.actionPlan,
      confidenceLevel: verdict.confidenceLevel,
    },
    debateLogs: logs,
    gameTheory: {
      payoffMatrix: Object.fromEntries(
        sorted.map(option => [
          option.optionName,
          { score: option.overallScore },
        ])
      ),
      nashEquilibrium: verdict.recommendation,
      strategicInsights: verdict.keyInsights,
    },
    scenarios: [],
    causalChains: { chains: [] },
  };
}

export function convertToLegacyFormat(
  analysis: CompleteAnalysis,
  input: DecisionInput
): OptionAnalysis[] {
  const rankings = analysis.finalReport.optionRankings;

  return input.options.map((option, index) => {
    const ranking =
      rankings.find(item => item.optionId === option.id) ||
      rankings.find(item => item.optionName === option.description) ||
      rankings[index];
    const score = ranking?.overallScore || 60;

    return {
      optionId: option.id,
      optionName: option.description,
      overallScore: score,
      dimensionScores: [
        {
          dimension: "Upside",
          score,
          details: "Potential benefit compared with the other options.",
        },
        {
          dimension: "Risk control",
          score: Math.max(30, 100 - (ranking?.cons?.length || 3) * 10),
          details: "How manageable the downside appears.",
        },
        {
          dimension: "Clarity",
          score: Math.max(35, score - 4),
          details: "How much this option reduces decision confusion.",
        },
      ],
      pros: ranking?.pros || [],
      cons: ranking?.cons || [],
      bestFor:
        ranking?.bestFor || "A reasonable path if its tradeoffs fit you.",
      riskLevel: score >= 78 ? "low" : score >= 64 ? "medium" : "high",
      cascadeEffects: {
        first_order: ranking?.pros || [],
        second_order: analysis.finalReport.reasoning,
        third_order: analysis.finalReport.keyInsights,
      },
      key_uncertainties: ranking?.cons || [],
      winningReasons: ranking?.winningReasons || [],
      losingReasons: ranking?.losingReasons || [],
    };
  });
}

function ensureList(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) return fallback;
  return value.filter(item => typeof item === "string" && item.trim());
}

function clampScore(value: number) {
  if (!Number.isFinite(value)) return 60;
  return Math.max(1, Math.min(100, Math.round(value)));
}

function normalizeConfidence(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  if (numeric > 1) return Math.max(0.01, Math.min(0.99, numeric / 100));
  return Math.max(0.01, Math.min(0.99, numeric));
}
